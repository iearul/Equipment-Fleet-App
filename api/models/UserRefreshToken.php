<?php

namespace app\models;

use yii\db\ActiveRecord;

class UserRefreshToken extends ActiveRecord
{
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::find()
            ->where(['userID' => (string) $token->getClaim('uid')])
            ->one();
    }
}
