<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function register(Request $request){

        $rules = array(
            'fullname' => 'required|string|max:55',
            'username' => 'required|string|max:55',
            'phone' => 'required|string|unique:users|regex:/^0[0-9]{1,9}/',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|min:8|same:password',
        );

        $messages = array(
            'fullname.required' => 'A fullname is required.',
            'fullname.max' => 'A fullname maximun input 55 characters.',
            'username.required' => 'A username is required.',
            'username.max' => 'A username maximun input 55 characters.',
            'phone.required' => 'A phone number is required.',
            'phone.regex' => 'A phone number is invalid.',
            'phone.unique' => 'A phone number is already registered.',
            'email.required' => 'A email address is required.',
            'email.email' => 'A email address is invalid.',
            'email.unique' => 'A email address is already registerd.',
            'password.required' => 'A password is required.',
            'password.min' => 'A password is required more than or equal 8 digits.',
            'password_confirmation.same' => 'Password confirmation should match pasasword fill.',
        );

        $validator = Validator::make($request->all(),$rules,$messages);
        if($validator->fails()){
            return response()->json([
                "statusCode" => 0,
                "message" => $validator->errors(),
            ]);
        }else{
            $user = new User([
                'fullname' => $request->get('fullname'),
                'username' => $request->get('username'),
                'phone' => $request->get('phone'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
            ]);
            $user->save();
            $accessToken = $user->createToken('myToken',['role:user'])->plainTextToken;
            $user->sendEmailVerificationNotification();
            return response()->json([
                'statusCode' => 1,
                'access_token' => $accessToken,
                'message' => 'Email sent! please comfirm your email at your inbox message.'
            ],201);
        }
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
        $request->user()->tokens()->delete();
        return ["message" => "logout: success"];
    }

    public function login(Request $request){
        $user = User::where('email',$request->email)->first();
        if (!$user || !Hash::check($request->password,$user->password)){
            return ['message' => 'wrong password'];
        }
        $user->tokens()->delete();
        $token = $user->createToken('myToken',['role:user'])->plainTextToken;
        return ["token" => $token];
    }
}
