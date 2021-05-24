<?php

namespace App\Http\Controllers;

use App\Models\Casepc;
use App\Models\Cpu;
use App\Models\Internalharddrive;
use App\Models\Memory;
use App\Models\Monitor;
use App\Models\Motherboard;
use App\Models\Powersupply;
use App\Models\Videocard;
use Illuminate\Http\Request;

class ComponentController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'current_page' => 'numeric|min:1|max:100'
        ]);
        switch ($request->component) {
            case 'cpu':
                $components = Cpu::paginate($request->input('current_page',10));
                break;
            case 'casepc':
                $components = Casepc::paginate($request->input('current_page',10));
                break;
            case 'internalharddrive':
                $components = Internalharddrive::paginate($request->input('current_page',10));
                break;
            case 'memory':
                $components = Memory::paginate($request->input('current_page',10));
                break;
            case 'monitor':
                $components = Monitor::paginate($request->input('current_page',10));
                break;
            case 'motherboard':
                $components = Motherboard::paginate($request->input('current_page',10));
                break;
            case 'powersupply':
                $components = Powersupply::paginate($request->input('current_page',10));
                break;
            case 'videocard':
                $components = Videocard::paginate($request->input('current_page',10));
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
        //dd($request->user()->adminshopID);
        switch ($request->component) {
            case 'cpu':
                $components = Cpu::all();
                break;
            case 'casepc':
                $components = Casepc::all();
                break;
            case 'internalharddrive':
                $components = Internalharddrive::all();
                break;
            case 'memory':
                $components = Memory::all();
                break;
            case 'monitor':
                $components = Monitor::all();
                break;
            case 'motherboard':
                $components = Motherboard::all();
                break;
            case 'powersupply':
                $components = Powersupply::all();
                break;
            case 'videocard':
                $components = Videocard::all();
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
}
