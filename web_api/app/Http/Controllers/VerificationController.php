<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Mail\VerificationEmail;
use App\Models\Adminshop;
use Illuminate\Support\Facades\Mail;

class VerificationController extends Controller
{

    public function verify( Request $request) {
        if(!$request->hasValidSignature()){
            return response()->json([
                'message' => 'Invalid/Expired url provided.',
            ],400);
        }
        if($request->route('permission') == 1){
            $user = Adminshop::find($request->route('id'));
        }else if($request->route('permission') == 0){
            $user = User::find($request->route('id'));
        }

        if ($user->hasVerifiedEmail()) {
            // return response()->json([
            //     'statusCode' => 1,
            //     'message'=>'already-verify',
            //     ]);
            return view('email_verified');
        }

        $user->markEmailAsVerified();
        return view('email_verified');
    }

      /**
 * @OA\Get(
 * path="/api/resend_email_verification",
 * summary="send email verify again",
 * tags={"user"},
 * security={ {"sanctum": {} }},
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="send successfully.")
 *        )
 *     )
 * )
 */

       /**
 * @OA\Get(
 * path="/api/admin_shop/resend_email_verification",
 * summary="send email verify again",
 * tags={"shop"},
 * security={ {"sanctum": {} }},
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="send successfully.")
 *        )
 *     )
 * )
 */

    public function resend(Request $request){
        $user = $request->user();

        if ($user->hasVerifiedEmail()){
             return response()->json([
                 'statusCode' => 0,
                 'message' => 'email has been verified.',
             ]);
        }

        $user->sendEmailVerificationNotification();
        return ['message' => 'send verify again'];
    }

    /**
 * @OA\Get(
 * path="/api/is_verify",
 * summary="check email is verify",
 * tags={"shop","user"},
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

    public function checkEmail(Request $request)
    {
        if($request->user()->hasVerifiedEmail())
        {
            return response()->json([
                'statusCode' => 1,
                'message' => 'email has been verified.',
            ]);
        }

        return response()->json([
            'statusCode' => 0,
            'message' => 'Your email address is not verified.',
        ]);

    }

}
