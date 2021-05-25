<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMotherboardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('motherboards', function (Blueprint $table) {
            $table->id('motherboardID');
            $table->string('brand');
            $table->string('model');
            $table->string('socket');
            $table->string('form_factor');
            $table->integer('ram_slots');
            $table->bigInteger('max_ram');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'socket',
                'form_factor',
                'ram_slots',
                'max_ram'
            ],'motherboards_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('motherboards');
    }
}
