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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::POST('/register', [\App\Http\Controllers\AuthController::class, 'register'])->middleware('html_filter');
Route::POST('/login', [\App\Http\Controllers\AuthController::class, 'login'])->middleware('html_filter');
Route::POST('/change_password', [\App\Http\Controllers\AuthController::class, 'changePassword'])->middleware('html_filter');


Route::middleware(['auth:sanctum', 'html_filter'])->group(function () {
    Route::post('/email/verification-notification', [\App\Http\Controllers\VerificationController::class, 'resend'])->name('verification.send');
    Route::get('email/verify/{id}/{hash}', [\App\Http\Controllers\VerificationController::class, 'verify'])->name('verification.verify');
    Route::POST('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

