<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Motherboardprice;

class Motherboard extends Model
{
    use HasFactory;

    public function motherboardprices()
    {
        return $this->hasMany(Motherboard::class,'monitorID');
    }
}
