<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Auth::routes();

// Password Reset Routes...
// user
Route::get('user/password/reset', '\App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('user/password/email', '\App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('user/password/reset/{token}', '\App\Http\Controllers\Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('user/password/reset', '\App\Http\Controllers\Auth\ResetPasswordController@reset')->name('password.update');

// shop
Route::get('admin_shop/password/reset', [\App\Http\Controllers\AuthShop\ForgotPasswordController::class,'showLinkRequestForm'])->name('shop.password.request');
Route::post('admin_shop/password/email', [\App\Http\Controllers\AuthShop\ForgotPasswordController::class,'sendResetLinkEmail'])->name('shop.password.email');
Route::get('admin_shop/password/reset/{token}', [\App\Http\Controllers\AuthShop\ResetPasswordController::class,'showResetForm'])->name('shop.password.reset');
Route::post('admin_shop/password/reset', [\App\Http\Controllers\AuthShop\ResetPasswordController::class,'reset'])->name('shop.password.update');

Route::get('/password_changed', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::fallback(function(){
    abort(404);
});
