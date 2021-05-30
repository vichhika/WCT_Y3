<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cpu;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Cpuprice extends Model
{
    use HasFactory;

    protected $primaryKey = 'cpupriceID';

    protected $fillable = [
        'cpuID',
        'adminshopID',
        'price',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function cpu()
    {
        return $this->belongsTo(Cpu::class,'cpuID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'cpupriceID');
    }
}
