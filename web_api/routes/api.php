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

    //shop auth
    Route::POST('/admin_shop/register',[\App\Http\Controllers\AuthShopController::class,'register']);
    Route::POST('/admin_shop/login',[\App\Http\Controllers\AuthShopController::class,'login']);

    //email verify
    Route::GET('email/verify/{id}/{hash}/{permission}', [\App\Http\Controllers\VerificationController::class, 'verify'])->name('verification.verify');

    // build pc route
    Route::GET('/index_shop',[\App\Http\Controllers\ShopController::class,'indexShop']);
    Route::GET('/list_shop',[\App\Http\Controllers\ShopController::class,'listShop']);
    Route::GET('/build/index',[\App\Http\Controllers\BuildpcController::class,'index']);
    Route::GET('/build/list',[\App\Http\Controllers\BuildpcController::class,'index']);
});

/////////////////////////////////////////////
Route::middleware(['shop_role','auth:sanctum','html_filter','verified'])->group(function(){
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
    Route::GET('/admin_shop/profile_info',[\App\Http\Controllers\ShopController::class,'profileInfo']);
    Route::GET('/admin_shop/resend_email_verification',[\App\Http\Controllers\VerificationController::class,'resend']);
    Route::POST('/admin_shop/profile_update',[\App\Http\Controllers\ShopController::class,'profileUpdate']);

});

Route::middleware(['user_role','auth:sanctum','html_filter','verified'])->group(function(){
    //route for user permission
    Route::GET('/resend_email_verification',[\App\Http\Controllers\VerificationController::class,'resend']);
    Route::GET('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::POST('/change_password', [\App\Http\Controllers\AuthController::class, 'changePassword']);
    Route::GET('/profile_info',[\App\Http\Controllers\UserController::class,'profileInfo']);
    Route::POST('profile_update',[\App\Http\Controllers\UserController::class,'profileUpdate']);

    // route build pc
    Route::POST('/build/save',[\App\Http\Controllers\BuildpcController::class,'save']);
});

Route::fallback(function(){
    abort(404);
});
