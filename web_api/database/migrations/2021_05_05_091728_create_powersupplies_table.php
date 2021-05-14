<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePowersuppliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('powersupplies', function (Blueprint $table) {
            $table->id('powersupplyID');
            $table->string('brand');
            $table->string('model');
            $table->string('form_factor');
            $table->bigInteger('wattage');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'form_factor',
                'wattage',
            ],'powersupplies_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('powersupplies');
    }
}
