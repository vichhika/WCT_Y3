<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

                /**
 * @OA\Get(
 * path="/api/profile_info",
 * summary="user profile info",
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

    public function profileInfo(Request $request)
    {
        $user = User::select('fullname','username','phone','email')->where('id',$request->user()->id)->get();
        return response()->json([
            'statusCode' => 1,
            'message' => $user
        ]);
    }
}
