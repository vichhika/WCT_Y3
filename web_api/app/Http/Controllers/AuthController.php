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
            ]);
        }
    }

    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email',$request->email)->first();
        if (!$user || !Hash::check($request->password,$user->password)){
            return response()->json([
                'statusCode' => 0,
                'message' => 'email  or password is incorrected.'
            ]);
        }
        $user->tokens()->delete();
        $token = $user->createToken('user_token',['role:user'])->plainTextToken;
        return response()->json([
            'statusCode' => 1,
            'user_token' => $token,
            'message' => 'login successfully.'
        ]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'statusCode' => 1,
            'message' => 'logout successfully.',
        ]);
    }

    public function forgotPassword(Request $request)
    {
        return response()->json([
            'statusCode' => 1,
        ]);
    }

    public function changePassword(Request $request)
    {
        if(!Hash::check($request->current_password, $request->user()->password))
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'current password is not correct.',
            ]);
        }

        $rules = array(
            'new_password' => 'required|string|min:8:unique:adminshops',
            'new_password_confirmation' => 'required|string|min:8|same:password',
        );

        $messages = array(
            'new_password.required' => 'A password is required.',
            'new_password.unique' => 'Cannot use old password.',
            'new_password.min' => 'A password is required more than or equal 8 digits.',
            'new_password_confirmation.same' => 'Password confirmation should match pasasword fill.',
        );

        $validator = Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            return response()->json([
                'statusCode' => 0,
                'message' => $validator->errors(),
            ]);
        }else
        {
            $request->user()->password = bcrypt($request->new_password);
            $request->user()->save();
            return response()->json([
                'statusCode' => 1,
                'message' => 'password change successfully.'
            ]);
        }
    }

}
