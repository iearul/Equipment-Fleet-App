<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Response;
use yii\data\Pagination;
use app\models\Equipment;
use yii\web\UploadedFile;
use yii\rest\ActiveController;
use sizeg\jwt\JwtHttpBearerAuth;
use yii\data\ActiveDataProvider;
use app\controllers\equipment\UploadImageAction;

class EquipmentController extends ActiveController
{
    public $modelClass = Equipment::class;

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

        $behaviors['authenticator'] = [
            'class' => JwtHttpBearerAuth::class
        ];

        return $behaviors;
    }

    public function beforeAction($action)
    {
        if (parent::beforeAction($action)) {
            Yii::$app->response->format = Response::FORMAT_JSON;
            return true;
        }
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['index']);

        $actions['upload-image'] = [
            'class' => UploadImageAction::class,
            'modelClass' => $this->modelClass,
            'checkAccess' => [$this, 'checkAccess'],
        ];

        return $actions;
    }

    public function actionIndex()
    {
        $request = Yii::$app->request;
        $query = Equipment::find();

        $query->orderBy(['id' => SORT_DESC]);
        if ($request->get('q')) {
            $query = $query->andFilterWhere([
                'like', 'name', $request->get('q')
            ])
                ->orFilterWhere([
                    'like', 'type', $request->get('q'),
                ]);
        }

        $pagination = new Pagination(['totalCount' => $query->count(), 'pageSize' => 10]);
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => $pagination,
            'sort' => [
                'attributes' => [
                    $request->get('sort_desc', 'id')
                ]
            ]
        ]);

        return [
            'result' => $dataProvider,
            'pagination' => $pagination
        ];
    }

    /**
     * Update equipment image
     * 
     * @return \yii\db\ActiveRecord|array|null
     */
    public function actionUpdateImage()
    {
        $request = Yii::$app->request->post();
        $uploads = UploadedFile::getInstancesByName('image');
        $equipment = Equipment::find()->where(['id' => $request['id']])->one();

        if (empty($uploads) || !isset($request['id'])) {
            Yii::$app->response->setStatusCode(422);
            return [
                'message' => 'Image and ID field is required'
            ];
        }

        $equipment->image = $this->uploadImage($uploads[0]);
        if ($equipment->validate()) {
            $equipment->update(false);
        }

        return $equipment;
    }

    /**
     * Upload a image file
     * 
     * @param mixed $image
     * @return false|string
     */
    public function uploadImage($image)
    {
        if (!file_exists('uploads'))
            mkdir('uploads');

        $path = 'uploads/' . $image->__toString();

        if (!in_array($image->getExtension(), ['jpg', 'jpeg', 'png', 'PNG', 'JPG', 'gif'])) {
            Yii::$app->response->setStatusCode(422);
            return false;
        }

        if (!$image->saveAs($path))
            return false;

        return $path;
    }

    /**
     * Create an equipment
     * 
     * @return \app\models\Equipment
     */
    public function actionCreate()
    {
        $request = Yii::$app->request->post();
        $uploads = UploadedFile::getInstancesByName('image');
        $equipment = new Equipment();

        $equipment->load($request, '');

        if (isset($uploads[0]))
            $equipment->image = $this->uploadImage($uploads[0]);


        if ($equipment->validate())
            $equipment->save(false);

        return $equipment;
    }
    public function actionUpdateData()
    {
        $request = Yii::$app->request->post();

        $uploads = UploadedFile::getInstancesByName('image');
        $equipment = Equipment::find()->where(['id' => $request['id']])->one();

        $equipment->load($request, '');

        if (isset($uploads[0]))
            $equipment->image = $this->uploadImage($uploads[0]);


        if ($equipment->validate())
            $equipment->save(false);
    }
}
