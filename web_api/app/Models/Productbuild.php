<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cpuprice;
use App\Models\Motherboardprice;
use App\Models\Powersupplyprice;
use App\Models\Internalharddriveprice;
use App\Models\Monitorprice;
use App\Models\Videocardprice;
use App\Models\Casepcprice;
use App\Models\Memoryprice;
use App\Models\User;

class Productbuild extends Model
{
    use HasFactory;

    protected $primaryKey = 'productbuildID';

    protected $fillable = [
        'cpupriceID',
        'motherboardpriceID',
        'powersupplypriceID',
        'internalharddrivepriceID',
        'monitorpriceID',
        'videocardpriceID',
        'casepcpriceID',
        'memorypriceID',
        'id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function cpuprice()
    {
        return $this->belongsTo(Cpuprice::class,'cpupriceID');
    }

    public function motherboardprice()
    {
        return $this->belongsTo(Motherboardprice::class,'motherboardpriceID');
    }

    public function powersupplyprice()
    {
        return $this->belongsTo(Powersupplyprice::class,'powersupplypriceID');
    }

    public function internalharddriveprice()
    {
        return $this->belongsTo(Internalharddriveprice::class,'internalharddrivepriceID');
    }

    public function monitorprice()
    {
        return $this->belongsTo(Monitorprice::class,'monitorpriceID');
    }

    public function videocardprice()
    {
        return $this->belongsTo(Videocardprice::class,'videocardpriceID');
    }

    public function casepcprice()
    {
        return $this->belongsTo(Casepcprice::class,'casepcpriceID');
    }

    public function memoryprice()
    {
        return $this->belongsTo(Memoryprice::class,'memorypriceID');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'id');
    }
}
