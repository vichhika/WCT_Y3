<?php

namespace App\Http\Controllers;

use App\Models\Productbuild;
use Illuminate\Http\Request;



class ProductController extends Controller
{

    /**
     * @OA\Get(
     * path="/api/product/index",
     * summary="index pagination products",
     * tags={"guest"},
     *  * @OA\Parameter(
     *          name="current_page",
     *          description="number of component",
     *           example="10",
     *          required=true,
     *          in="query",
     *      ),
     *  * @OA\Parameter(
     *          name="page",
     *          description="index of page",
     *           example="1",
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

    public function index(Request $request)
    {
        if ($request->user()) {
            return response()->json([
                'statusCode' => 0,
                'message' => 'Bad request',
            ], 400);
        }

        $request->validate([
            'current_page' => 'numeric|min:1|max:100',
            'page' => 'numeric|min:1',
        ]);

        $products = Productbuild::with([
            'user:id,fullname',
            'casepcprice:casepcpriceID,casepcID,price',
            'casepcprice.casepc',
            'cpuprice:cpupriceID,cpuID,price',
            'cpuprice.cpu',
            'internalharddriveprice:internalharddrivepriceID,price,internalharddriveID',
            'internalharddriveprice.internalharddrive',
            'memoryprice:memorypriceID,price,memoryID',
            'memoryprice.memory',
            'monitorprice:monitorpriceID,price,monitorID',
            'monitorprice.monitor',
            'motherboardprice:motherboardpriceID,price,motherboardID',
            'motherboardprice.motherboard',
            'powersupplyprice:powersupplypriceID,price,powersupplyID',
            'powersupplyprice.powersupply',
            'videocardprice:videocardpriceID,price,videocardID',
            'videocardprice.videocard'
        ])->paginate($request->input('current_page', 10));

        $productlist = array();
        foreach ($products as $key => $product) {
            $totalprice = $product->cpuprice->price + $product->casepcprice->price + $product->internalharddriveprice->price + $product->memoryprice->price + $product->monitorprice->price + $product->motherboardprice->price + $product->powersupplyprice->price + $product->videocardprice->price;
            array_push($productlist, array(
                "productbuildID" => $product->productbuildID,
                "totalprice" => $totalprice,
                "casepc" => $product->casepcprice->casepc,
                "cpu" => $product->cpuprice->cpu,
                "internalharddrive" => $product->internalharddriveprice->internalharddrive,
                "memory" => $product->memoryprice->memory,
                "monitor" => $product->monitorprice->monitor,
                "motherboard" => $product->motherboardprice->motherboard,
                "powersupply" => $product->powersupplyprice->powersupply,
                "videocard" => $product->videocardprice->videocard,
            ));
        }


        if($products->isEmpty()){
            return response()->json([
                'statusCode' => 0,
                'message' => null
            ]);
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $productlist,
            'total_page' => $products->lastPage(),
        ]);
    }

    /**
     * @OA\Get(
     * path="/api/product/list",
     * summary="list pagination products",
     * tags={"guest"},
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
        if ($request->user()) {
            return response()->json([
                'statusCode' => 0,
                'message' => 'Bad request',
            ], 400);
        }

        $products = Productbuild::with([
            'user:id,fullname',
            'casepcprice:casepcpriceID,casepcID,price',
            'casepcprice.casepc',
            'cpuprice:cpupriceID,cpuID,price',
            'cpuprice.cpu',
            'internalharddriveprice:internalharddrivepriceID,price,internalharddriveID',
            'internalharddriveprice.internalharddrive',
            'memoryprice:memorypriceID,price,memoryID',
            'memoryprice.memory',
            'monitorprice:monitorpriceID,price,monitorID',
            'monitorprice.monitor',
            'motherboardprice:motherboardpriceID,price,motherboardID',
            'motherboardprice.motherboard',
            'powersupplyprice:powersupplypriceID,price,powersupplyID',
            'powersupplyprice.powersupply',
            'videocardprice:videocardpriceID,price,videocardID',
            'videocardprice.videocard'
        ])->get();

        $productlist = array();
        foreach ($products as $key => $product) {
            $totalprice = $product->cpuprice->price + $product->casepcprice->price + $product->internalharddriveprice->price + $product->memoryprice->price + $product->monitorprice->price + $product->motherboardprice->price + $product->powersupplyprice->price + $product->videocardprice->price;
            array_push($productlist, array(
                "productbuildID" => $product->productbuildID,
                "totalprice" => $totalprice,
                "casepc" => $product->casepcprice->casepc,
                "cpu" => $product->cpuprice->cpu,
                "internalharddrive" => $product->internalharddriveprice->internalharddrive,
                "memory" => $product->memoryprice->memory,
                "monitor" => $product->monitorprice->monitor,
                "motherboard" => $product->motherboardprice->motherboard,
                "powersupply" => $product->powersupplyprice->powersupply,
                "videocard" => $product->videocardprice->videocard,
            ));
        }

        if($products->isEmpty()){
            return response()->json([
                'statusCode' => 0,
                'message' => null
            ]);
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $productlist,
        ]);
    }

    /**
     * @OA\Get(
     * path="/api/build/product_index",
     * summary="index pagination products by user",
     * tags={"user"},
     * security={ {"sanctum": {} }},
     *  * @OA\Parameter(
     *          name="current_page",
     *          description="number of component",
     *           example="10",
     *          required=true,
     *          in="query",
     *      ),
     *  * @OA\Parameter(
     *          name="page",
     *          description="index of page",
     *           example="1",
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

    public function indexByUser(Request $request)
    {

        $request->validate([
            'current_page' => 'numeric|min:1|max:100',
            'page' => 'numeric|min:1',
        ]);

        $products = Productbuild::with([
            'user:id,fullname',
            'casepcprice:casepcpriceID,casepcID,price',
            'casepcprice.casepc',
            'cpuprice:cpupriceID,cpuID,price',
            'cpuprice.cpu',
            'internalharddriveprice:internalharddrivepriceID,price,internalharddriveID',
            'internalharddriveprice.internalharddrive',
            'memoryprice:memorypriceID,price,memoryID',
            'memoryprice.memory',
            'monitorprice:monitorpriceID,price,monitorID',
            'monitorprice.monitor',
            'motherboardprice:motherboardpriceID,price,motherboardID',
            'motherboardprice.motherboard',
            'powersupplyprice:powersupplypriceID,price,powersupplyID',
            'powersupplyprice.powersupply',
            'videocardprice:videocardpriceID,price,videocardID',
            'videocardprice.videocard'
        ])->where('id', $request->user()->id)->paginate($request->input('current_page', 10));

        $productlist = array();
        foreach ($products as $key => $product) {
            $totalprice = $product->cpuprice->price + $product->casepcprice->price + $product->internalharddriveprice->price + $product->memoryprice->price + $product->monitorprice->price + $product->motherboardprice->price + $product->powersupplyprice->price + $product->videocardprice->price;
            array_push($productlist, array(
                "productbuildID" => $product->productbuildID,
                "totalprice" => $totalprice,
                "casepc" => $product->casepcprice->casepc,
                "cpu" => $product->cpuprice->cpu,
                "internalharddrive" => $product->internalharddriveprice->internalharddrive,
                "memory" => $product->memoryprice->memory,
                "monitor" => $product->monitorprice->monitor,
                "motherboard" => $product->motherboardprice->motherboard,
                "powersupply" => $product->powersupplyprice->powersupply,
                "videocard" => $product->videocardprice->videocard,
            ));
        }

        if($products->isEmpty()){
            return response()->json([
                'statusCode' => 0,
                'message' => null
            ]);
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $productlist,
            'total_page' => $products->lastPage(),
        ]);
    }

    /**
     * @OA\Get(
     * path="/api/build/product_list",
     * summary="list products by user",
     * tags={"user"},
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

    public function listByUser(Request $request)
    {

        $request->validate([
            'current_page' => 'numeric|min:1|max:100',
            'page' => 'numeric|min:1',
        ]);

        $products = Productbuild::with([
            'user:id,fullname',
            'casepcprice:casepcpriceID,casepcID,price',
            'casepcprice.casepc',
            'cpuprice:cpupriceID,cpuID,price',
            'cpuprice.cpu',
            'internalharddriveprice:internalharddrivepriceID,price,internalharddriveID',
            'internalharddriveprice.internalharddrive',
            'memoryprice:memorypriceID,price,memoryID',
            'memoryprice.memory',
            'monitorprice:monitorpriceID,price,monitorID',
            'monitorprice.monitor',
            'motherboardprice:motherboardpriceID,price,motherboardID',
            'motherboardprice.motherboard',
            'powersupplyprice:powersupplypriceID,price,powersupplyID',
            'powersupplyprice.powersupply',
            'videocardprice:videocardpriceID,price,videocardID',
            'videocardprice.videocard'
        ])->where('id', $request->user()->id)->get();

        $productlist = array();
        foreach ($products as $key => $product) {
            $totalprice = $product->cpuprice->price + $product->casepcprice->price + $product->internalharddriveprice->price + $product->memoryprice->price + $product->monitorprice->price + $product->motherboardprice->price + $product->powersupplyprice->price + $product->videocardprice->price;
            array_push($productlist, array(
                "productbuildID" => $product->productbuildID,
                "totalprice" => $totalprice,
                "casepc" => $product->casepcprice->casepc,
                "cpu" => $product->cpuprice->cpu,
                "internalharddrive" => $product->internalharddriveprice->internalharddrive,
                "memory" => $product->memoryprice->memory,
                "monitor" => $product->monitorprice->monitor,
                "motherboard" => $product->motherboardprice->motherboard,
                "powersupply" => $product->powersupplyprice->powersupply,
                "videocard" => $product->videocardprice->videocard,
            ));
        }

        if($products->isEmpty()){
            return response()->json([
                'statusCode' => 0,
                'message' => null
            ]);
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $productlist,
        ]);
    }
}
