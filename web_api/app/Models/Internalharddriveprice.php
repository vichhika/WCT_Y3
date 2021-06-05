<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Internalharddrive;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Internalharddriveprice extends Model
{
    use HasFactory;

    protected $primaryKey = 'internalharddrivepriceID';

    protected $fillable = [
        'internalharddriveID',
        'adminshopID',
        'price',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function internalharddrive()
    {
        return $this->belongsTo(Internalharddrive::class,'internalharddriveID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'internalharddrivepriceID');
    }
}
