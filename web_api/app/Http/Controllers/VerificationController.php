<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;

class VerificationController extends Controller
{
    public function verify( Request $request) {
        if(!$request->hasValidSignature()){
            return response()->json([
                'statusCode' => 0,
                'message' => 'Invalid/Expired url provided.',
            ],400);
        }

        $user = User::find($request->route('id'));

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

    public function resend(Request $request){
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()){
             return redirect('/already-verify');
        }

        $user->sendEmailVerificationNotification();
        return ['message' => 'send verify again'];
    }

}
