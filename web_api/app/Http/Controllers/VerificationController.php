<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify( Request $request) {
        if(!$request->hasValidSignature()){
            return ['message'=>'Invalid/Expired url provided.'];
        }

        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return ['message'=>'already-verify'];
        }

        $user->markEmailAsVerified();

        //redirect to frondend
        return ['message'=>'verify'];
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
