<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Cpuprice;
use App\Models\Caseprice;
use App\Models\Internalharddriveprice;
use App\Models\Memoryprice;
use App\Models\Monitorprice;
use App\Models\Motherboardprice;
use App\Models\Powersupplyprice;
use App\Models\Videocardprice;

class Adminshop extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'shop_name',
        'phonenumber',
        'email',
        'location',
        'profile'
    ];

    protected $hidden= [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function casepcprices()
    {
        return $this->hasMany(Caseprice::class,'adminshopID');
    }

    public function cpuprices()
    {
        return $this->hasMany(Cpuprice::class,'adminshopID');
    }

    public function internalharddriveprices()
    {
        return $this->hasMany(Internalharddriveprice::class,'adminshopID');
    }

    public function memoryprices()
    {
        return $this->hasMany(Memoryprice::class,'adminshopID');
    }

    public function monitorprices()
    {
        return $this->hasMany(Monitorprice::class,'adminshopID');
    }

    public function motherboardprices()
    {
        return $this->hasMany(Motherboardprice::class,'adminshopID');
    }

    public function powersupplyprices()
    {
        return $this->hasMany(Powersupplyprice::class,'adminshopID');
    }

    public function videocardprices()
    {
        return $this->hasMany(Videocardprice::class,'adminshopID');
    }

}
