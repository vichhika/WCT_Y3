<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Monitorprice;

class Monitor extends Model
{
    use HasFactory;

    protected $primaryKey = 'monitorID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function monitorprices()
    {
        return $this->hasMany(Monitor::class,'monitorID');
    }
}
