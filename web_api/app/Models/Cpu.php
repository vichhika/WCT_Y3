<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cpuprice;

class Cpu extends Model
{
    use HasFactory;

    protected $primaryKey = 'cpuID';

    public function cpuprices()
    {
        return $this->hasMany(Cpuprice::class,'cpuID');
    }
}
