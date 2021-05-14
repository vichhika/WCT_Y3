<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternalharddrivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internalharddrives', function (Blueprint $table) {
            $table->id('internalharddriveID');
            $table->string('brand');
            $table->string('model');
            $table->bigInteger('capacity');
            $table->string('form_factor');
            $table->string('storage_type');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'capacity',
                'form_factor',
                'storage_type',
            ],'internalharddrives_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('internalharddrives');
    }
}
