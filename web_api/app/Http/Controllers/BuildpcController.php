<?php

namespace App\Http\Controllers;

use App\Models\Caseprice;
use App\Models\Cpuprice;
use App\Models\Internalharddriveprice;
use App\Models\Memoryprice;
use App\Models\Monitorprice;
use App\Models\Motherboardprice;
use App\Models\Powersupplyprice;
use App\Models\Productbuild;
use App\Models\Videocardprice;
use Illuminate\Http\Request;

class BuildpcController extends Controller
{
    /**
 * @OA\Get(
 * path="/api/build/index",
 * summary="index pagination components price by shopID",
 * tags={"guest","user"},
 *  *  * @OA\Parameter(
*          name="adminshopID",
*          description="id of component",
*           example="1",
*          required=true,
*          in="query",
*      ),
 *  * @OA\Parameter(
*          name="component",
*          description="name of component",
*           example="cpu",
*          required=true,
*          in="query",
*      ),
 * @OA\Parameter(
*          name="current_page",
*          description="number of component",
*           example="10",
*          required=false,
*          in="query",
*      ),
 * @OA\Parameter(
*          name="page",
*          description="number of pagination",
*           example="1",
*          required=false,
*          in="query",
*      ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it.")
 *        )
 *     )
 * )
 */
    public function index(Request $request)
    {
        $request->validate([
            'adminshopID' => 'required',
            'component' => 'required',
            'current_page' => 'numeric|min:1|max:100'
        ]);
        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'casepc':
                $components = Caseprice::with(['Casepc'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'internalharddrive':
                $components = Internalharddriveprice::with(['Internalharddrive'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'memory':
                $components = Memoryprice::with(['Memory'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'monitor':
                $components = Monitorprice::with(['Monitor'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'motherboard':
                $components = Motherboardprice::with(['Motherboard'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'powersupply':
                $components = Powersupplyprice::with(['Powersupply'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'videocard':
                $components = Videocardprice::with(['Videocard'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
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
 * @OA\Get(
 * path="/api/build/list",
 * summary="list components price by shopID",
 * tags={"guest","user"},
 *  *  * @OA\Parameter(
*          name="adminshopID",
*          description="id of component",
*           example="1",
*          required=true,
*          in="query",
*      ),
 *  * @OA\Parameter(
*          name="component",
*          description="name of component",
*           example="cpu",
*          required=true,
*          in="query",
*      ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it.")
 *        )
 *     )
 * )
 */

    public function list(Request $request)
    {
        $request->validate([
            'adminshopID' => 'required',
            'component' => 'required'
        ]);
        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'casepc':
                $components = Caseprice::with(['Casepc'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'internalharddrive':
                $components = Internalharddriveprice::with(['Internalharddrive'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'memory':
                $components = Memoryprice::with(['Memory'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'monitor':
                $components = Monitorprice::with(['Monitor'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'motherboard':
                $components = Motherboardprice::with(['Motherboard'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'powersupply':
                $components = Powersupplyprice::with(['Powersupply'])->where('adminshopID', $request->adminshopID)->get();
                break;
            case 'videocard':
                $components = Videocardprice::with(['Videocard'])->where('adminshopID', $request->adminshopID)->get();
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



    public function save(Request $request)
    {
        $components = array(
            Cpuprice::where('cpupriceID', $request->cpupriceID)->first(),
            Caseprice::where('casepcpriceID', $request->casepcpriceID)->first(),
            Internalharddriveprice::where('internalharddrivepriceID', $request->internalharddrivepriceID)->first(),
            Memoryprice::where('memorypriceID', $request->memorypriceID)->first(),
            Monitorprice::where('monitorpriceID', $request->monitorpriceID)->first(),
            Motherboardprice::where('motherboardpriceID', $request->motherboardpriceID)->first(),
            Powersupplyprice::where('powersupplypriceID', $request->powersupplypriceID)->first(),
            Videocardprice::where('videocardpriceID', $request->videocardpriceID)->first()
        );

        foreach($components as $is_exist){
            if(!$is_exist){
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'invalid submit.'
                ]);
            }
        }

        Productbuild::create([
            'cpupriceID' => $request->cpupriceID,
            'motherboardpriceID' => $request->motherboardpriceID,
            'powersupplypriceID' => $request->powersupplypriceID,
            'internalharddrivepriceID' => $request->internalharddrivepriceID,
            'monitorpriceID' => $request->internalharddrivepriceID,
            'videocardpriceID' => $request->videocardpriceID,
            'casepcpriceID' => $request->casepcpriceID,
            'memorypriceID' =>$request->memorypriceID,
            'id' => $request->user()->id,
        ]);

        return response()->json([
            'statusCode' => 1,
            'message' => 'save successfully.'
        ]);

    }

    public function result(Request $request)
    {

    }
}
