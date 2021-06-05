<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Caseprice;

class Casepc extends Model
{
    use HasFactory;

    protected $primaryKey = 'casepcID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function caseprices()
    {
        return $this->hasMany(Caseprice::class,'casepcID');
    }
}
