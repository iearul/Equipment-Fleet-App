<?php

namespace app\models;

use Yii;
use yii\helpers\Url;
use yii\db\ActiveRecord;
use yii\base\DynamicModel;
use yii\data\ActiveDataFilter;

class Equipment extends ActiveRecord
{

    public static function tableName()
    {
        return 'equipment';
    }

    public function afterFind()
    {
        if ($this->getAttribute('image'))
            $this->setAttribute('image', Url::base('') . '/' . $this->getAttribute('image'));

        parent::afterFind();
    }

    public function rules()
    {
        return [
            [['name', 'type'], 'required'],
            ['name', 'string'],
            ['image', 'string'],
            ['type', 'string'],
            ['construction_number', 'string'],
            ['construction_year', 'integer'],
            ['description', 'string']
        ];
    }
}
