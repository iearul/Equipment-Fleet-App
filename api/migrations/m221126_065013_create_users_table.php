<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%users}}`.
 */
class m221126_065013_create_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%users}}', [
            'id' => $this->primaryKey(),
            'full_name' => $this->string(50)->notNull(),
            'dob' => $this->date(),
            'auth_key' => $this->string(1000),
            'access_token' => $this->string(1000),
            'username' => $this->string(50)->notNull()->unique(),
            'email' => $this->string(50)->notNull(),
            'password' => $this->string()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%users}}');
    }
}
