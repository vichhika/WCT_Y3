<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Motherboard;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Motherboardprice extends Model
{
    use HasFactory;

    protected $primaryKey = 'motherboardpriceID';

    protected $fillable = [
        'motherboardID',
        'adminshopID',
        'price',
    ];

    public function motherboard()
    {
        return $this->belongsTo(Motherboard::class,'motherboardID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'motherboardpriceID');
    }
}
