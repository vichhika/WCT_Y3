<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Monitor;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Monitorprice extends Model
{
    use HasFactory;

    protected $fillable = [
        'monitorID',
        'adminshopID',
        'price',
    ];

    public function monitor()
    {
        return $this->belongsTo(Memory::class,'monitorID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'monitorpriceID');
    }
}
