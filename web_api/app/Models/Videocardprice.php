<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Videocard;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Videocardprice extends Model
{
    use HasFactory;

    protected $primaryKey = 'videocardpriceID';

    protected $fillable = [
        'videocardID',
        'adminshopID',
        'price',
    ];

    public function videocard()
    {
        return $this->belongsTo(Videocard::class,'videocardID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'videocardpriceID');
    }
}
