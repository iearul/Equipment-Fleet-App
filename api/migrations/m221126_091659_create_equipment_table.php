<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%equipment}}`.
 */
class m221126_091659_create_equipment_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%equipment}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'image' => $this->text(),
            'type' => $this->string()->notNull(),
            'construction_number' => $this->string(),
            'construction_year' => $this->integer(),
            'description' => $this->text(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%equipment}}');
    }
}
