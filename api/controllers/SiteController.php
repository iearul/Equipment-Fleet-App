<?php

namespace app\controllers;

use yii\filters\Cors;
use yii\rest\Controller;

class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
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

    public function actionError()
    {
        return [
            'message' => 'Not found'
        ];
    }
}
