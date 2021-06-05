<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memoryprice;

class Memory extends Model
{
    use HasFactory;

    protected $primaryKey = 'memoryID';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function memoryprices()
    {
        return $this->hasMany(Memoryprice::class,'memoryID');
    }
}
