<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('memories', function (Blueprint $table) {
            $table->id('memoryID');
            $table->string('brand');
            $table->string('model');
            $table->string('module_type');
            $table->bigInteger('speed');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'module_type',
                'speed',
            ],'memories_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('memories');
    }
}
