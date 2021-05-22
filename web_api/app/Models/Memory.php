<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memoryprice;

class Memory extends Model
{
    use HasFactory;

    public function memoryprices()
    {
        return $this->hasMany(Memoryprice::class,'memoryID');
    }
}
