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

//General route
Route::middleware(['html_filter'])->group(function (){
    //user auth
    Route::POST('/register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::POST('/login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::POST('/change_password', [\App\Http\Controllers\AuthController::class, 'changePassword']);

    //shop auth
    Route::POST('/admin_shop/register',[\App\Http\Controllers\AuthShopController::class,'register']);
    Route::POST('/admin_shop/login',[\App\Http\Controllers\AuthShopController::class,'login']);

    //email verify
    Route::GET('/email/verification_resend/{id}', [\App\Http\Controllers\VerificationController::class, 'resend'])->name('verification.send');
    Route::GET('email/verify/{id}/{hash}', [\App\Http\Controllers\VerificationController::class, 'verify'])->name('verification.verify');

    // build pc route
    Route::GET('/build/index',[\App\Http\Controllers\BuildpcController::class,'index']);
    Route::GET('/build/list',[\App\Http\Controllers\BuildpcController::class,'index']);
});

/////////////////////////////////////////////
Route::middleware(['shop_role','auth:sanctum','html_filter'])->group(function(){
    //route for shop owner permission
    Route::POST('/admin_shop/change_password',[\App\Http\Controllers\AuthShopController::class,'changePassword']);
    Route::GET('/admin_shop/logout',[\App\Http\Controllers\AuthShopController::class,'logout']);
    Route::GET('/admin_shop/components/index',[\App\Http\Controllers\ComponentController::class,'index']);
    Route::GET('/admin_shop/components/list',[\App\Http\Controllers\ComponentController::class,'list']);
    Route::GET('/admin_shop/index',[\App\Http\Controllers\ShopController::class,'index']);
    Route::GET('/admin_shop/list',[\App\Http\Controllers\ShopController::class,'list']);
    Route::POST('/admin_shop/store',[\App\Http\Controllers\ShopController::class,'store']);
    Route::POST('/admin_shop/update',[\App\Http\Controllers\ShopController::class,'update']);
    Route::POST('/admin_shop/destroy',[\App\Http\Controllers\ShopController::class,'destroy']);

});

Route::middleware(['user_role','auth:sanctum','html_filter'])->group(function(){
    //route for user permission
    Route::POST('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::GET('/user',function (Request $request){return $request->user();});
});
