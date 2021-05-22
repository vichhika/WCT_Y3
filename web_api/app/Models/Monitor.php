<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Monitorprice;

class Monitor extends Model
{
    use HasFactory;

    public function monitorprices()
    {
        return $this->hasMany(Monitor::class,'monitorID');
    }
}
