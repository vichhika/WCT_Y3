<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemorypricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memoryprices', function (Blueprint $table) {
            $table->id('memorypriceID');
            $table->bigInteger('memoryID');
            $table->bigInteger('adminshopID');
            $table->integer('price');
            $table->timestamps();
            $table->unique([
                'memoryID',
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
        Schema::dropIfExists('memoryprices');
    }
}
