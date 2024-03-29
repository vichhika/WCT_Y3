<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memory;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Memoryprice extends Model
{
    use HasFactory;

    protected $primaryKey = 'memorypriceID';

    protected $fillable = [
        'memoryID',
        'adminshopID',
        'price',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function memory()
    {
        return $this->belongsTo(Memory::class,'memoryID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'memorypriceID');
    }
}
