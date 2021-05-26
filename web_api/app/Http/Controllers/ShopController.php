<?php

namespace App\Http\Controllers;

use App\Models\Adminshop;
use App\Models\Casepc;
use App\Models\Caseprice;
use App\Models\Cpu;
use App\Models\Cpuprice;
use App\Models\Internalharddrive;
use App\Models\Internalharddriveprice;
use App\Models\Memory;
use App\Models\Memoryprice;
use App\Models\Monitor;
use App\Models\Monitorprice;
use App\Models\Motherboard;
use App\Models\Motherboardprice;
use App\Models\Powersupply;
use App\Models\Powersupplyprice;
use App\Models\Videocard;
use App\Models\Videocardprice;
use Illuminate\Http\Request;
use Whoops\Run;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            'current_page' => 'numeric|min:1|max:100'
        ]);
        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'casepc':
                $components = Caseprice::with(['Casepc'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'internalharddrive':
                $components = Internalharddriveprice::with(['Internalharddrive'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'memory':
                $components = Memoryprice::with(['Memory'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'monitor':
                $components = Monitorprice::with(['Monitor'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'motherboard':
                $components = Motherboardprice::with(['Motherboard'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'powersupply':
                $components = Powersupplyprice::with(['Powersupply'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'videocard':
                $components = Videocardprice::with(['Videocard'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            default:
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'not found.'
                ]);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $components,
        ]);
    }

    public function list(Request $request)
    {
        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'casepc':
                $components = Caseprice::with(['Casepc'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'internalharddrive':
                $components = Internalharddriveprice::with(['Internalharddrive'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'memory':
                $components = Memoryprice::with(['Memory'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'monitor':
                $components = Monitorprice::with(['Monitor'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'motherboard':
                $components = Motherboardprice::with(['Motherboard'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'powersupply':
                $components = Powersupplyprice::with(['Powersupply'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'videocard':
                $components = Videocardprice::with(['Videocard'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            default:
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'not found.'
                ]);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $components,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'price' => 'required|numeric'
        ]);

        switch ($request->component) {
            case 'cpu':
                $component = Cpu::where('cpuID',$request->cpuID)->first();
                $is_exist = Cpuprice::where([
                    ['cpuID',$request->cpuID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Cpuprice::create([
                    'cpuID' => $request->cpuID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'casepc':
                $component = Casepc::where('casepcID',$request->casepcID)->first();
                $is_exist = Caseprice::where([
                    ['casepcID',$request->casepcID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Caseprice::create([
                    'casepcID' => $request->casepcID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'internalharddrive':
                $component = Internalharddrive::where('internalharddriveID',$request->internalharddriveID)->first();
                $is_exist = Internalharddriveprice::where([
                    ['internalharddriveID',$request->internalharddriveID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Internalharddriveprice::create([
                    'internalharddriveID' => $request->internalharddriveID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'memory':
                $component = Memory::where('memoryID',$request->memoryID)->first();
                $is_exist = Memoryprice::where([
                    ['memoryID',$request->memoryID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Memoryprice::create([
                    'memoryID' => $request->memoryID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'monitor':
                $component = Monitor::where('monitorID',$request->monitorID)->first();
                $is_exist = Monitorprice::where([
                    ['monitorID',$request->monitorID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Monitorprice::create([
                    'monitorID' => $request->monitorID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'motherboard':
                $component = Motherboard::where('motherboardID',$request->motherboardID)->first();
                $is_exist = Motherboardprice::where([
                    ['motherboardID',$request->motherboardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Motherboardprice::create([
                    'motherboardID' => $request->motherboardID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'powersupply':
                $component = Powersupply::where('powersupplyID',$request->powersupplyID)->first();
                $is_exist = Powersupplyprice::where([
                    ['powersupplyID',$request->powersupplyID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Powersupplyprice::create([
                    'powersupplyID' => $request->powersupplyID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'videocard':
                $component = Videocard::where('videocardID',$request->videocardID)->first();
                $is_exist = Videocardprice::where([
                    ['videocardID',$request->videocardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }else if($is_exist)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is already set price.'
                    ]);
                }
                Videocardprice::create([
                    'videocardID' => $request->videocardID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            default:
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'not found.'
                ]);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => 'add price successfully.'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'price' => 'required|numeric'
        ]);

        switch ($request->component) {
            case 'cpu':
                $component = Cpuprice::where([
                    ['cpuID',$request->cpuID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'cpuID' => $request->cpuID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'casepc':
                $component = Caseprice::where([
                    ['casepcID',$request->casepcID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'casepcID' => $request->casepcID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'internalharddrive':
                $component = Internalharddriveprice::where([
                    ['internalharddriveID',$request->internalharddriveID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'internalharddriveID' => $request->internalharddriveID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'memory':
                $component = Memoryprice::where([
                    ['memoryID',$request->memoryID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'memoryID' => $request->memoryID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'monitor':
                $component = Monitorprice::where([
                    ['monitorID',$request->monitorID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'monitorID' => $request->monitorID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'motherboard':
                $component = Motherboardprice::where([
                    ['motherboardID',$request->motherboardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'motherboardID' => $request->motherboardID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'powersupply':
                $component = Powersupplyprice::where([
                    ['powersupplyID',$request->powersupplyID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'powersupplyID' => $request->powersupplyID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            case 'videocard':
                $component = Videocardprice::where([
                    ['videocardID',$request->videocardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->update([
                    'videocardID' => $request->videocardID,
                    'adminshopID' => $request->user()->adminshopID,
                    'price' => $request->price
                ]);
                break;
            default:
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'not found.'
                ]);
                break;
        }
        return response()->json([
            'statusCode' => 1,
            'message' => 'update price successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        switch ($request->component) {
            case 'cpu':
                $component = Cpuprice::where([
                    ['cpuID',$request->cpuID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'casepc':
                $component = Caseprice::where([
                    ['casepcID',$request->casepcID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'internalharddrive':
                $component = Internalharddriveprice::where([
                    ['internalharddriveID',$request->internalharddriveID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'memory':
                $component = Memoryprice::where([
                    ['memoryID',$request->memoryID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'monitor':
                $component = Monitorprice::where([
                    ['monitorID',$request->monitorID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'motherboard':
                $component = Motherboardprice::where([
                    ['motherboardID',$request->motherboardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'powersupply':
                $component = Powersupplyprice::where([
                    ['powersupplyID',$request->powersupplyID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            case 'videocard':
                $component = Videocardprice::where([
                    ['videocardID',$request->videocardID],
                    ['adminshopID',$request->user()->adminshopID]])->first();
                if(!$component)
                {
                    return response()->json([
                        'statusCode' => 0,
                        'message' => 'component is not existed.'
                    ]);
                }
                $component->delete();
                break;
            default:
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'not found.'
                ]);
                break;
        }
        return response()->json([
            'statusCode' => 1,
            'message' => 'delete price successfully.'
        ]);
    }

    public function indexShop(Request $request)
    {
        $request->validate([
            'current_page' => 'numeric|min:1|max:100'
        ]);
        $shops = Adminshop::paginate($request->input('current_page',10));

        return response()->json([
            'statusCode' => 1,
            'message' => $shops
        ]);
    }

    public function listShop(Request $request)
    {
        $shops = Adminshop::all(['shop_name','phonenumber','email','location','profile']);

        return response()->json([
            'statusCode' => 1,
            'message' => $shops
        ]);
    }
}
