<?php

namespace app\commands;

use app\models\Equipment;
use Yii;
use Faker\Factory;
use app\models\User;
use yii\console\Controller;

class SeedDatabaseCommand extends Controller
{
    public function actionIndex()
    {
        $this->generateEquipments()->createUser();
    }

    public function createUser()
    {
        $user = new User();
        $user->full_name = 'Test User';
        $user->username = 'test_user';
        $user->email = 'test@gmail.com';
        $user->password = Yii::$app->security->generatePasswordHash('123456');
        $user->dob = '1994-10-05';
        $user->save();

        return $this;
    }

    public function generateEquipments()
    {
        $faker = Factory::create();

        $type = array(1 => 'Cutter Systems', 2 => 'Duty-Cycle Cranes', 3 => 'Drilling Rigs', 4 => 'ValueLine', 5 => 'Others');

        for ($i = 0; $i < 20; $i++) {
            $equipment = new Equipment();

            $equipment->load([
                'name' => $faker->sentence(),
                'type' => $type[array_rand($type)],
                'construction_number' => (string) $faker->randomNumber(),
                'construction_year' => (int) $faker->year(),
                'description' => $faker->sentences(3, true),
                'image' => 'uploads/test.jpg',
            ], '');

            $equipment->save();
        }

        return $this;
    }
}
