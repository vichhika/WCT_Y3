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
        $user = User::select('id','fullname','username','phone','email')->where('id',$request->user()->id)->get();
        return response()->json([
            'statusCode' => 1,
            'message' => $user
        ]);
    }

    /**
 * @OA\Post(
 * path="/api/profile_update",
 * summary="user update profile",
 * tags={"user"},
 * security={ {"sanctum": {} }},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"fullname","phone","email"},
 *      @OA\Property(property="fullname", type="string", format="fullname", example="Sok kha"),
 *      @OA\Property(property="phone", type="string", format="phone", example="012812812"),
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
            'fullname' => 'required|string|max:55',
            'email' => 'required|email',
            'phone' => 'required|string|regex:/^0[0-9]{8,9}$/',
        ]);

        $duplicates = User::where('id','!=',$request->user()->id)->get(['email','phone'])->all();
        foreach($duplicates as $duplicate)
        {
            if($duplicate->email == $request->email || $duplicate->phone == $request->phone)
            {
                return response()->json([
                    'statusCode' => 0,
                    'message' => 'email or phone is already used.'
                ]);
            }
        }

        if($request->email == $request->user()->email){
            $request->user()->update([
                'fullname' => $request->fullname,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            return response()->json([
                'statusCode' => 1,
                'message' => 'profile update successfully.'
            ]);
        }

        $request->user()->update([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'email_verified_at' => NULL,
        ]);

        $request->user()->sendEmailVerificationNotification();
        return response()->json([
            'statusCode' => 2,
            'message' => 'profile update successfully. Please check your inbox to verify your email.'
        ]);
    }

}
