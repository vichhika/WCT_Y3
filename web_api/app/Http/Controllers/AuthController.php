<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        $token = $user->createToken('myToken')->plainTextToken;

        return ["token" => $token];
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
