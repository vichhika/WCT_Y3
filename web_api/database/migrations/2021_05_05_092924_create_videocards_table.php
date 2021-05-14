<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideocardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videocards', function (Blueprint $table) {
            $table->id('videocardID');
            $table->string('brand');
            $table->string('model');
            $table->string('chipset');
            $table->bigInteger('vram');
            $table->timestamps();
            $table->unique([
               'brand',
               'model',
               'chipset',
               'vram',
            ],'videocardID');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videocards');
    }
}
