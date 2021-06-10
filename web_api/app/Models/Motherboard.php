<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Motherboardprice;

class Motherboard extends Model
{
    use HasFactory;

    protected $primaryKey = 'motherboardID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function motherboardprices()
    {
        return $this->hasMany(Motherboard::class,'motherboardID');
    }
}
