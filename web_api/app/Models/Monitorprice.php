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

    protected $primaryKey = 'monitorpriceID';

    protected $fillable = [
        'monitorID',
        'adminshopID',
        'price',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function monitor()
    {
        return $this->belongsTo(Monitor::class,'monitorID');
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
