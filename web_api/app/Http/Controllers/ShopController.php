<?php

namespace App\Http\Controllers;

use App\Models\Adminshop;
use App\Models\Casepc;
use App\Models\Casepcprice;
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
use OpenApi\Annotations\Get;

class ShopController extends Controller
{
    /**
 * @OA\Get(
 * path="/api/admin_shop/index",
 * summary="shop owner index pagination product added",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 *  * @OA\Parameter(
*          name="component",
*          description="name of component",
*          example="cpu",
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
            'component' => 'required',
            'current_page' => 'numeric|min:1|max:100',
            'page' => 'numeric|min:1',
        ]);
        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
                break;
            case 'casepc':
                $components = Casepcprice::with(['Casepc'])->where('adminshopID', $request->user()->adminshopID)->paginate($request->input('current_page',10));
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
            'message' => $components->items(),
        ]);
    }
    /**
 * @OA\Get(
 * path="/api/admin_shop/list",
 * summary="shop owner list product added",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 *  * @OA\Parameter(
*          name="component",
*          description="name of component",
*          example="cpu",
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
            'component' => 'required',
        ]);

        switch ($request->component) {
            case 'cpu':
                $components = Cpuprice::with(['Cpu'])->where('adminshopID', $request->user()->adminshopID)->get();
                break;
            case 'casepc':
                $components = Casepcprice::with(['Casepc'])->where('adminshopID', $request->user()->adminshopID)->get();
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
 * path="/api/admin_shop/store",
 * summary="shop owner add product",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 *  * @OA\RequestBody(
*          required=true,
*          @OA\JsonContent(
*               required={"component","cpuID","price"},
*      @OA\Property(property="component", type="string", format="string", example="cpu"),
*      @OA\Property(property="cpuID", type="integer", format="integer", example="1"),
*      @OA\Property(property="price", type="integer", format="integer", example="85"),
*          )
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
    public function store(Request $request)
    {
        $request->validate([
            'component' => 'required',
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
                $is_exist = Casepcprice::where([
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
                Casepcprice::create([
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
                ],404);
                break;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => 'add price successfully.'
        ],201);
    }

    /**
 * @OA\Post(
 * path="/api/admin_shop/update",
 * summary="shop owner update product",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 *  * @OA\RequestBody(
*          required=true,
*          @OA\JsonContent(
*               required={"component","cpuID","price"},
*      @OA\Property(property="component", type="string", format="string", example="cpu"),
*      @OA\Property(property="cpuID", type="integer", format="integer", example="1"),
*      @OA\Property(property="price", type="integer", format="integer", example="85"),
*          )
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
    public function update(Request $request)
    {
        $request->validate([
            'component' => 'required',
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
                $component = Casepcprice::where([
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
                ],404);
                break;
        }
        return response()->json([
            'statusCode' => 1,
            'message' => 'update price successfully.'
        ]);
    }

    /**
 * @OA\Post(
 * path="/api/admin_shop/destroy",
 * summary="shop owner destroy product",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 *  * @OA\RequestBody(
*          required=true,
*          @OA\JsonContent(
*               required={"component","cpuID"},
*      @OA\Property(property="component", type="string", format="string", example="cpu"),
*      @OA\Property(property="cpuID", type="integer", format="integer", example="1"),
*          )
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
    public function destroy(Request $request)
    {

        $request->validate([
            'component' => 'required',
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
                $component->delete();
                break;
            case 'casepc':
                $component = Casepcprice::where([
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
                ],404);
                break;
        }
        return response()->json([
            'statusCode' => 1,
            'message' => 'delete price successfully.'
        ]);
    }

        /**
 * @OA\Get(
 * path="/api/index_shop",
 * summary="index pagination shop",
 * tags={"guest","user"},
 * @OA\Parameter(
*          name="current_page",
*          description="number of adminshop",
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

    public function indexShop(Request $request)
    {
        $request->validate([
            'current_page' => 'numeric|min:1|max:100'
        ]);
        $shops = Adminshop::select('adminshopID','shop_name','profile')->paginate($request->input('current_page',10));

        return response()->json([
            'statusCode' => 1,
            'message' => $shops->items()
        ]);
    }

        /**
 * @OA\Get(
 * path="/api/list_shop",
 * summary="list shop",
 * tags={"guest","user"},
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it.")
 *        )
 *     )
 * )
 */

    public function listShop(Request $request)
    {
        $shops = Adminshop::all(['adminshopID','shop_name','profile']);

        return response()->json([
            'statusCode' => 1,
            'message' => $shops
        ]);
    }

            /**
 * @OA\Get(
 * path="/api/admin_shop/profile_info",
 * summary="shop profile info",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="please test it.")
 *        )
 *     )
 * )
 */

    public function profileInfo(Request $request)
    {
        $shop = Adminshop::select('adminshopID','shop_name','phonenumber','email','location','profile')->where('adminshopID',$request->user()->adminshopID)->get();
        return response()->json([
            'statusCode' => 1,
            'message' => $shop
        ]);
    }

        /**
 * @OA\Post(
 * path="/api/admin_shop/profile_update",
 * summary="admin shop update profile",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"shop_name","phonenumber","email"},
 *      @OA\Property(property="shop_name", type="string", format="shop_name", example="Sok kha"),
 *      @OA\Property(property="phonenumber", type="string", format="phonenumber", example="012812812"),
 *      @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="profile update successfully.")
 *        )
 *     )
 * )
 */

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'shop_name' => 'required|string|max:55',
            'phonenumber' => 'required|string|regex:/^0[0-9]{1,9}/',
            'email' => 'required|email',
        ]);

        $duplicates = Adminshop::where('adminshopID','!=',$request->user()->adminshopID)->get(['shop_name','phonenumber','email'])->all();
        foreach($duplicates as $duplicate)
        {
            if($duplicate->shop_name == $request->shop_name || $duplicate->phonenumber == $request->phonenumber || $duplicate->email == $request->email)
            {
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'Shop name, phone number, or email is used.'
                ]);
            }
        }

        if($request->email == $request->user()->email)
        {
            $request->user()->update([
                'shop_name' => $request->shop_name,
                'phonenumber' => $request->phonenumber,
                'email' =>  $request->email,
            ]);

            return response()->json([
                'statusCode' => 1,
                'message' => 'profile update successfully.'
            ]);
        }

        $request->user()->update([
            'shop_name' => $request->shop_name,
            'phonenumber' => $request->phonenumber,
            'email' =>  $request->email,
            'email_verified_at' => NULL,
        ]);

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'statusCode' => 2,
            'message' => 'profile update successfully. Please check your inbox to verify your email.'
        ]);
    }
}
