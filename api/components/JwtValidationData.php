<?php
namespace app\components;

use Yii;
use sizeg\jwt\JwtValidationData as JWD;

class JwtValidationData extends JWD {
	/**
	 * @inheritdoc
	 */
	public function init() {
		$jwtParams = Yii::$app->params['jwt'];
		$this->validationData->setIssuer($jwtParams['issuer']);
		$this->validationData->setAudience($jwtParams['audience']);
		$this->validationData->setId($jwtParams['id']);

		parent::init();
	}
}