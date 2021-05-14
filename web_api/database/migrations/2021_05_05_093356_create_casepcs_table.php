<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCasepcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('casepcs', function (Blueprint $table) {
            $table->id('casepcID');
            $table->string('brand');
            $table->string('model');
            $table->string('form_factor');
            $table->integer('external_bays');
            $table->integer('internal_bays');
            $table->timestamps();
            $table->unique([
                'brand',
                'model',
                'form_factor',
                'external_bays',
                'internal_bays',
            ],'casepcs_unique_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('casepcs');
    }
}
