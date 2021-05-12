<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitors', function (Blueprint $table) {
            $table->id('monitorID');
            $table->string('brand');
            $table->string('model');
            $table->integer('size');
            $table->integer('resolution_width');
            $table->integer('resolution_height');
            $table->string('refresh_rate');
            $table->string('panel_type');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'size',
                'resolution_width',
                'resolution_height',
                'refresh_rate',
                'panel_type',
            ],'monitors_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monitors');
    }
}
