<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCasepricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('caseprices', function (Blueprint $table) {
            $table->id('casepriceID');
            $table->bigInteger('caseID');
            $table->bigInteger('adminshopID');
            $table->integer('price');
            $table->timestamps();
            $table->unique([
                'caseID',
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
        Schema::dropIfExists('caseprices');
    }
}
