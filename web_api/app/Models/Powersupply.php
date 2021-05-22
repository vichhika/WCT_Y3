<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Powersupplyprice;

class Powersupply extends Model
{
    use HasFactory;

    public function powersupplyprices()
    {
        return $this->hasMany(Powersupplyprice::class,'powersupplyID');
    }
}
