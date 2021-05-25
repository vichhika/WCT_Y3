<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//leang
Route::middleware(['html_filter'])->group(function (){
    Route::POST('/register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::POST('/login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::POST('/change_password', [\App\Http\Controllers\AuthController::class, 'changePassword']);

});

//leang
Route::GET('/email/verification_resend/{id}', [\App\Http\Controllers\VerificationController::class, 'resend'])->name('verification.send');
Route::GET('email/verify/{id}/{hash}', [\App\Http\Controllers\VerificationController::class, 'verify'])->name('verification.verify');

//leang
Route::middleware(['auth:sanctum', 'html_filter'])->group(function () {
    Route::POST('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::GET('/user',function (Request $request){return $request->user();});
});

