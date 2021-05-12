<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify( EmailVerificationRequest $request) {
        $user = User::find($request->route('id'));

        if ($user->hasVerifiedEmail()) {
            return ['message'=>'/already-verify'];
        }

        $request->fulfill();

         return ['message'=>'/verify'];
    }

    public function resend(Request $request){
        if ($request->user()->hasVerifiedEmail()){
             return redirect('/already-verify');
        }
        $request->user()->sendEmailVerificationNotification();
        return ['message' => 'send verify again'];
    }

}
