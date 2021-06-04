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
        if($request->user())
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'Bad request',
            ],400);
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
            ])->paginate($request->input('current_page',10),['id','cpupriceID','internalharddrivepriceID','memorypriceID','monitorpriceID','motherboardpriceID','powersupplypriceID','videocardpriceID','casepcpriceID']);

        foreach($products as $key=>$product)
        {
            $totalprice = $product->cpuprice->price + $product->casepcprice->price + $product->internalharddriveprice->price + $product->memoryprice->price + $product->monitorprice->price + $product->motherboardprice->price + $product->powersupplyprice->price + $product->videocardprice->price;
            $products[$key]->totalprice = $totalprice;
        }

        return response()->json([
            'statusCode' => 1,
            'message' => $products->items()
        ]);
    }
}
