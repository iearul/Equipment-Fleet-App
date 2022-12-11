<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Cookie;
use app\models\User;
use app\models\LoginForm;
use yii\rest\ActiveController;
use app\models\UserRefreshToken;
use sizeg\jwt\JwtHttpBearerAuth;
use yii\web\ServerErrorHttpException;
use yii\web\UnauthorizedHttpException;

class AuthController extends ActiveController
{
    public $modelClass = User::class;
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);
        
        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => Cors::class
        ];

        return $behaviors;
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->getBodyParams(), '') && $model->login()) {
            $user = Yii::$app->user->identity;

            $token = $this->generateJwt($user);

            $this->generateRefreshToken($user);

            return [
                'user' => $user,
                'token' => (string) $token,
            ];
        } else {
            return $model->getErrors();
        }
    }

    public function actionRefreshToken()
    {
        $refreshToken = Yii::$app->response->cookies->getValue('refresh-token', false);
        if (!$refreshToken) {
            throw new UnauthorizedHttpException('No refresh token found.');
        }

        $userRefreshToken = UserRefreshToken::findOne(['urf_token' => $refreshToken]);

        if (Yii::$app->request->getMethod() == 'POST') {
            // Getting new JWT after it has expired
            if (!$userRefreshToken) {
                return new UnauthorizedHttpException('The refresh token no longer exists.');
            }

            $user = \app\models\User::find()  //adapt this to your needs
                ->where(['userID' => $userRefreshToken->urf_userID])
                ->andWhere(['not', ['usr_status' => 'inactive']])
                ->one();
            if (!$user) {
                $userRefreshToken->delete();
                return new UnauthorizedHttpException('The user is inactive.');
            }

            $token = $this->generateJwt($user);

            return [
                'status' => 'ok',
                'token' => (string) $token,
            ];
        } elseif (Yii::$app->request->getMethod() == 'DELETE') {
            // Logging out
            if ($userRefreshToken && !$userRefreshToken->delete()) {
                return new ServerErrorHttpException('Failed to delete the refresh token.');
            }

            return ['status' => 'ok'];
        } else {
            return new UnauthorizedHttpException('The user is inactive.');
        }
    }

    private function generateJwt(\app\models\User $user)
    {
        $jwt = Yii::$app->jwt;
        $signer = $jwt->getSigner('HS256');
        $key = $jwt->getKey();
        $time = time();

        $jwtParams = Yii::$app->params['jwt'];

        return $jwt->getBuilder()
            ->issuedBy($jwtParams['issuer'])
            ->permittedFor($jwtParams['audience'])
            ->identifiedBy($jwtParams['id'], true)
            ->issuedAt($time)
            ->expiresAt($time + $jwtParams['expire'])
            ->withClaim('uid', $user->id)
            ->getToken($signer, $key);
    }

    /**
     * @throws yii\base\Exception
     */
    private function generateRefreshToken(\app\models\User $user, \app\models\User $impersonator = null): \app\models\UserRefreshToken
    {
        $refreshToken = Yii::$app->security->generateRandomString(200);

        // TODO: Don't always regenerate - you could reuse existing one if user already has one with same IP and user agent
        $userRefreshToken = new \app\models\UserRefreshToken([
            'urf_userID' => $user->id,
            'urf_token' => $refreshToken,
            'urf_ip' => Yii::$app->request->userIP,
            'urf_user_agent' => Yii::$app->request->userAgent,
            'urf_created' => gmdate('Y-m-d H:i:s'),
        ]);
        if (!$userRefreshToken->save()) {
            throw new ServerErrorHttpException('Failed to save the refresh token: ' . $userRefreshToken->getErrorSummary(true));
        }

        // Send the refresh-token to the user in a HttpOnly cookie that Javascript can never read and that's limited by path
        Yii::$app->response->cookies->add(new Cookie([
            'name' => 'refresh-token',
            'value' => $refreshToken,
            'httpOnly' => true,
            'sameSite' => 'none',
            'secure' => false,
            'path' => '/auth/refresh-token',  //endpoint URI for renewing the JWT token using this refresh-token, or deleting refresh-token
        ]));

        return $userRefreshToken;
    }
}
