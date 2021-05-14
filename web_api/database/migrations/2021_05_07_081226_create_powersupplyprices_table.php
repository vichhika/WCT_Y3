<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePowersupplypricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('powersupplyprices', function (Blueprint $table) {
            $table->id('powersupplypriceID');
            $table->bigInteger('powersupplyID');
            $table->bigInteger('adminshopID');
            $table->integer('price');
            $table->timestamps();
            $table->unique([
                'powersupplyID',
                'adminshopID',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('powersupplyprices');
    }
}
