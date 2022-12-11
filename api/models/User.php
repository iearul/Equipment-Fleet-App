<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use app\models\UserRefreshToken;

class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return 'users';
    }

    public function rules()
    {
        return [
            [['email', 'password'], 'required'],
        ];
    }

    /**
     * Finds an identity by the given ID.
     *
     * @param string|int $id the ID to be looked for
     * @return IdentityInterface|null the identity object that matches the given ID.
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * @param mixed $token — the token to be looked for
     * @param mixed $type the type of the token. The value of this parameter depends on the implementation. For example, [[\yii\filters\auth\HttpBearerAuth]] will set this parameter to be yii\filters\auth\HttpBearerAuth.
     * @return IdentityInterface|null
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return self::findIdentity($token->getClaim('uid'));
    }

    /**
     * Find a user by the username
     * 
     * @param mixed $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }

    /**
     * Find a user by the email
     * 
     * @param mixed $email
     * @return static|null
     */
    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }

    /**
     * @return int|string current user ID
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string|null current user auth key
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @param string $authKey
     * @return bool|null if auth key is valid for current user
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * @param string $password
     * @return bool|null if auth key is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->getSecurity()->validatePassword($password, $this->password);
    }

    /**
     * Run this method before save a data
     * 
     * @param string $password
     * @return void
     */
    public function setPassword($password)
    {
        $this->password = Yii::$app->getSecurity()->generatePasswordHash($password);
    }

    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if ($this->isNewRecord) {
                $this->auth_key = \Yii::$app->security->generateRandomString();
            }
            return true;
        }
        return false;
    }

    public function afterSave($isInsert, $changedOldAttributes)
    {
        // Purge the user tokens when the password is changed
        if (array_key_exists('password', $changedOldAttributes)) {
            UserRefreshToken::deleteAll(['urf_userID' => $this->id]);
        }

        return parent::afterSave($isInsert, $changedOldAttributes);
    }
}
