<?php

namespace App\Http\Controllers;

use App\Models\Adminshop;
use App\Models\Casepcprice;
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
*          description="id of adminshop",
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
                $components = Casepcprice::with(['Casepc'])->where('adminshopID', $request->adminshopID)->paginate($request->input('current_page',10));
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
                ],404);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $components->items(),
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
                $components = Casepcprice::with(['Casepc'])->where('adminshopID', $request->adminshopID)->get();
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
                ],404);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $components,
        ]);
    }

/**
 * @OA\Post(
 * path="/api/build/save",
 * summary="user save build pc",
 * tags={"user"},
 * security={ {"sanctum": {} }},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"adminshopID","cpuID","casepcID","internalharddriveID","memoryID","monitorID","motherboardID","powersupplyID","videocardID"},
 *      @OA\Property(property="adminshopID", type="Integer", format="Integer", example="1"),
 *          @OA\Property(property="cpuID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="casepcID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="internalharddriveID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="memoryID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="monitorID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="motherboardID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="powersupplyID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="videocardID", type="Integer", format="Integer", example="1"),
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it")
 *        )
 *     )
 * )
 */

    public function save(Request $request)
    {
        $request->validate([
            'adminshopID' => 'required|numeric',
            'cpuID' => 'required|numeric',
            'casepcID' => 'required|numeric',
            'internalharddriveID' => 'required|numeric',
            'memoryID' => 'required|numeric',
            'monitorID' => 'required|numeric',
            'motherboardID' => 'required|numeric',
            'powersupplyID' => 'required|numeric',
            'videocardID' => 'required|numeric',
        ]);

        $components = array(
            Cpuprice::where([
                ['adminshopID' , $request->adminshopID],
                ['cpuID' , $request->cpuID]
            ])->first(),
            Casepcprice::where([
                ['adminshopID' , $request->adminshopID],
                ['casepcID' , $request->casepcID]
            ])->first(),
            Internalharddriveprice::where([
                ['adminshopID' , $request->adminshopID],
                ['internalharddriveID' , $request->internalharddriveID]
            ])->first(),
            Memoryprice::where([
                ['adminshopID' , $request->adminshopID],
                ['memoryID' , $request->memoryID]
            ])->first(),
            Monitorprice::where([
                ['adminshopID' , $request->adminshopID],
                ['monitorID' , $request->monitorID]
            ])->first(),
            Motherboardprice::where([
                ['adminshopID' , $request->adminshopID],
                ['motherboardID' , $request->motherboardID]
            ])->first(),
            Powersupplyprice::where([
                ['adminshopID' , $request->adminshopID],
                ['powersupplyID' , $request->powersupplyID]
            ])->first(),
            Videocardprice::where([
                ['adminshopID' , $request->adminshopID],
                ['videocardID' , $request->videocardID]
            ])->first(),
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
            'cpupriceID' => $components[0]->cpupriceID,
            'casepcpriceID' => $components[1]->casepcpriceID,
            'internalharddrivepriceID' => $components[2]->internalharddrivepriceID,
            'memorypriceID' =>$components[3]->memorypriceID,
            'monitorpriceID' => $components[4]->monitorpriceID,
            'motherboardpriceID' => $components[5]->motherboardpriceID,
            'powersupplypriceID' => $components[6]->powersupplypriceID,
            'videocardpriceID' => $components[7]->videocardpriceID,
            'id' => $request->user()->id,
        ]);

        return response()->json([
            'statusCode' => 1,
            'message' => 'save successfully.'
        ],201);

    }

    /**
 * @OA\Post(
 * path="/api/build/delete",
 * summary="user delete build product",
 * tags={"user"},
 * security={ {"sanctum": {} }},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"productbuildID"},
 *      @OA\Property(property="productbuildID", type="Integer", format="Integer", example="1"),
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it")
 *        )
 *     )
 * )
 */

    public function destory(Request $request)
    {
        $request->validate([
            'productbuildID' => 'required|numeric',
        ]);

        $productbuild = Productbuild::where([
            ['productbuildID',$request->productbuildID],
            ['id',$request->user()->id]
        ])->first();

        if(!$productbuild)
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'product is not existed.'
            ]);
        }
        $productbuild->delete();
        return response()->json([
            'statusCode' => 1,
            'message' => 'product deleted successfully.'
        ]);
    }

    /**
 * @OA\Post(
 * path="/api/build/relative_build",
 * summary="finding relative build",
 * tags={"user","guest"},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"adminshopID","cpuID","casepcID","internalharddriveID","memoryID","monitorID","motherboardID","powersupplyID","videocardID"},
 *         @OA\Property(property="adminshopID", type="Integer", format="Integer", example="1"),
 *         @OA\Property(property="cpuID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="casepcID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="internalharddriveID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="memoryID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="monitorID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="motherboardID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="powersupplyID", type="Integer", format="Integer", example="1"),
 *  *      @OA\Property(property="videocardID", type="Integer", format="Integer", example="1"),
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it")
 *        )
 *     )
 * )
 */

    public function relativeBuild(Request $request)
    {
        $request->validate([
            'adminshopID' => 'required|numeric',
            'cpuID' => 'required|numeric',
            'casepcID' => 'required|numeric',
            'internalharddriveID' => 'required|numeric',
            'memoryID' => 'required|numeric',
            'monitorID' => 'required|numeric',
            'motherboardID' => 'required|numeric',
            'powersupplyID' => 'required|numeric',
            'videocardID' => 'required|numeric',
        ]);
        $shops = Adminshop::where('adminshopID','!=',$request->adminShopID)->get(['adminshopID','shop_name']);
        $result = array();
        foreach($shops as $shop)
        {
            $cpuprice = Cpuprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['cpuID' , $request->cpuID]
            ])->first();
            $casepcprice = Casepcprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['casepcID' , $request->casepcID]
            ])->first();
            $internalharddriveprice = Internalharddriveprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['internalharddriveID' , $request->internalharddriveID]
            ])->first();
            $memoryprice = Memoryprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['memoryID' , $request->memoryID]
            ])->first();
            $monitorprice = Monitorprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['monitorID' , $request->monitorID]
            ])->first();
            $motherboardprice = Motherboardprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['motherboardID' , $request->motherboardID]
            ])->first();
            $powersupplyprice = Powersupplyprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['powersupplyID' , $request->powersupplyID]
            ])->first();
            $videocardprice = Videocardprice::where([
                ['adminshopID' , $shop->adminshopID],
                ['videocardID' , $request->videocardID]
            ])->first();

            if( $cpuprice &&
                 $casepcprice &&
                 $internalharddriveprice &&
                 $memoryprice &&
                 $monitorprice &&
                 $motherboardprice &&
                 $powersupplyprice &&
                 $videocardprice )
            {
                $totalprice = $cpuprice->price + $casepcprice->price + $internalharddriveprice->price + $memoryprice->price + $monitorprice->price + $motherboardprice->price + $powersupplyprice->price + $videocardprice->price;
                array_push($result,array(
                'adminshopID' => $shop->adminshopID,
                'shop_name' => $shop->shop_name,
                // 'cpupriceID' => $cpuprice->cpupriceID,
                // 'motherboardpriceID' => $motherboardprice->motherboardpriceID,
                // 'powersupplypriceID' => $powersupplyprice->powersupplypriceID,
                // 'internalharddrivepriceID' => $internalharddriveprice->internalharddrivepriceID,
                // 'monitorpriceID' => $monitorprice->monitorpriceID,
                // 'videocardpriceID' => $videocardprice->videocardpriceID,
                // 'casepcpriceID' => $casepcprice->casepcpriceID,
                // 'memorypriceID' =>$memoryprice->memorypriceID,
                'totalprice' => $totalprice,
               ));
            }
        }

        if(empty($result)){
            return response()->json([
                'statusCode' => 0,
                'message' => 'no pc build related.'
            ]);
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $result
        ]);

    }
}
