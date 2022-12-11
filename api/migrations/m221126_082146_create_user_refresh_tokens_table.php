<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user_refresh_tokens}}`.
 */
class m221126_082146_create_user_refresh_tokens_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%user_refresh_token}}', [
            'user_refresh_tokenID' => $this->primaryKey(),
            'urf_userID' => $this->integer()->notNull(),
            'urf_token' => $this->string(1000),
            'urf_ip' => $this->string(),
            'urf_user_agent' => $this->string(1000),
            'urf_created' => $this->dateTime(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%user_refresh_token}}');
    }
}
