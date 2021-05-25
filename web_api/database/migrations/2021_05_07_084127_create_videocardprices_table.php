<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideocardpricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videocardprices', function (Blueprint $table) {
            $table->id('videocardpriceID');
            $table->bigInteger('videocardID');
            $table->bigInteger('adminshopID');
            $table->integer('price');
            $table->timestamps();
            $table->unique([
                'videocardID',
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
        Schema::dropIfExists('videocardprices');
    }
}
