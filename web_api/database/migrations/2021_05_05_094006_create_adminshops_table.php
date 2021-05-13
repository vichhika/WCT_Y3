<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminshopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adminshops', function (Blueprint $table) {
            $table->id('adminshopID');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('shop_name')->unique();
            $table->string('phonenumber')->unique();
            $table->string('email')->unique();
            $table->string('location');
            $table->string('profile');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('adminshops');
    }
}