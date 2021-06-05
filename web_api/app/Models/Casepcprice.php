<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Casepc;
use App\Models\Adminshop;
use App\Models\Productbuild;

class Casepcprice extends Model
{
    use HasFactory;

    protected $table = 'casepcprices';
    protected $primaryKey = 'casepcpriceID';

    protected $fillable = [
        'casepcID',
        'adminshopID',
        'price'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function casepc()
    {
        return $this->belongsTo(Casepc::class,'casepcID');
    }

    public function adminshop()
    {
        return $this->belongsTo(Adminshop::class,'adminshopID');
    }

    public function productbuilds()
    {
        return $this->hasMany(Productbuild::class,'casepcpriceID');
    }
}
