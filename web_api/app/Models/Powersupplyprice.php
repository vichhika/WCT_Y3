<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Powersupply;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Powersupplyprice extends Model
{
    use HasFactory;

    protected $fillable = [
        'powersupplyID',
        'adminshopID',
        'price',
    ];

    public function powersupply()
    {
        return $this->belongsTo(Powersupply::class,'powersupplyID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'powersupplypriceID');
    }
}
