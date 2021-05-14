<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCpusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cpus', function (Blueprint $table) {
            $table->id('cpuID');
            $table->string('brand');
            $table->string('model');
            $table->integer('cores');
            $table->integer('tdp');
            $table->string('integrated_graphics');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'cores',
                'tdp',
                'integrated_graphics',
            ],'cpus_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cpus');
    }
}
