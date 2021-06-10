<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use internalharddriveprices;

class Internalharddrive extends Model
{
    use HasFactory;

    protected $primaryKey = 'internalharddriveID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function internalharddriveprices()
    {
        return $this->hasMany(internalharddriveprices::class,'internalharddriveID');
    }
}
