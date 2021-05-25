<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonitorpricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitorprices', function (Blueprint $table) {
            $table->id('monitorpriceID');
            $table->bigInteger('monitorID');
            $table->bigInteger('adminshopID');
            $table->integer('price');
            $table->timestamps();
            $table->unique([
                'monitorID',
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
        Schema::dropIfExists('monitorprices');
    }
}
