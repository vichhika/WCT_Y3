<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Videocardprice;

class Videocard extends Model
{
    use HasFactory;

    protected $primaryKey = 'videocardID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function videocardprices()
    {
        return $this->hasMany(Videocardprice::class,'videocardID');
    }
}
