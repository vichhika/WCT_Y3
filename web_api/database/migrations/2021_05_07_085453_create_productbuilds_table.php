<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductbuildsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productbuilds', function (Blueprint $table) {
            $table->id('productbuildID');
            $table->bigInteger('cpupriceID');
            $table->bigInteger('motherboardpriceID');
            $table->bigInteger('powersupplypriceID');
            $table->bigInteger('internalharddrivepriceID');
            $table->bigInteger('monitorpriceID');
            $table->bigInteger('videocardpriceID');
            $table->bigInteger('casepcpriceID');
            $table->bigInteger('memorypriceID');
            $table->bigInteger('id');
            $table->timestamps();
            $table->unique([
                'cpupriceID',
                'motherboardpriceID',
                'powersupplypriceID',
                'internalharddrivepriceID',
                'monitorpriceID',
                'videocardpriceID',
                'casepcpriceID',
                'memorypriceID',
                'id',
            ],'unique_productbuild_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productbuilds');
    }
}
