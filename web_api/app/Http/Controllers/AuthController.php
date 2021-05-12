<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Testing\Fluent\Concerns\Has;

class AuthController extends Controller
{
    public function register(Request $request){
        $user = new User();
        $user->fullname = $request->fullname;
        $user->username = $request->username;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);


        $user->save();
        event(new Registered($user));
        $token = $user->createToken('myToken')->plainTextToken;


        return ["token" => $token];
    }

    public function changePassword(Request $request){
        $user = User::where('email',$request->email)->first();

        if (!$user){
            return response('Login wrong email', 502);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response('Login wrong password', 503);
        }
        if ($request->newpassword != $request->confirmpassword){
            return response('Login password and confirm pasword invalid', 504);
        }

        $user->password = bcrypt($request->newpassword);
        $user->save();
        return ['newpassword' => $user->password,'message' => 'change password success',$request->all()];
    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return ["message" => "logout: success"];
    }

    public function login(Request $request){
        $user = User::where('email',$request->email)->first();

        if (!$user || !Hash::check($request->password,$user->password)){
            return ['message' => 'wrong password'];
        }

        $token = $user->createToken('myToken')->plainTextToken;
        return ["token" => $token];

    }
}
