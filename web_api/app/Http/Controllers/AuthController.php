<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{

/**
 * @OA\Post(
 * path="/api/register",
 * summary="user register",
 * tags={"user"},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"fullname","username","phone","email","password","password_confirmation"},
 *      @OA\Property(property="fullname", type="string", format="fullname", example="Sok kha"),
 *      @OA\Property(property="username", type="string", format="username", example="user1"),
 *      @OA\Property(property="phone", type="string", format="phone", example="012812812"),
 *      @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
 *      @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
 *      @OA\Property(property="password_confirmation", type="string", format="password_confirmation", example="PassWord12345"),
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="Email sent! please comfirm your email at your inbox message.")
 *        )
 *     )
 * )
 */

    public function register(Request $request){

        $rules = array(
            'fullname' => 'required|string|max:55',
            'username' => 'required|string|max:55|unique:users',
            'phone' => 'required|string|unique:users|regex:/^0[0-9]{8,9}/',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|min:8|same:password',
        );

        $messages = array(
            'fullname.required' => 'A fullname is required.',
            'fullname.max' => 'A fullname maximun input 55 characters.',
            'username.required' => 'A username is required.',
            'username.max' => 'A username maximun input 55 characters.',
            'username.unique' => 'A username is already registerd.',
            'phone.required' => 'A phone number is required.',
            'phone.regex' => 'A phone number is invalid.',
            'phone.unique' => 'A phone number is already registered.',
            'email.required' => 'A email address is required.',
            'email.email' => 'A email address is invalid.',
            'email.unique' => 'A email address is already registerd.',
            'password.required' => 'A password is required.',
            'password.min' => 'A password is required more than or equal 8 digits.',
            'password_confirmation.same' => 'Password confirmation should match password fill.',
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
                'permission' => 0,
            ]);
            $user->save();
            $accessToken = $user->createToken('myToken',['role:user'])->plainTextToken;
            $user->sendEmailVerificationNotification();
            //Mail::to($user->email)->send(new VerificationEmail($user));
            return response()->json([
                'statusCode' => 1,
                'access_token' => $accessToken,
                'message' => 'Email sent! please comfirm your email at your inbox message.'
            ],201);
        }
    }

    /**
 * @OA\Post(
 * path="/api/login",
 * summary="user login",
 * tags={"user"},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"email","password"},
 *      @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
 *      @OA\Property(property="password", type="string", format="password", example="PassWord12345")
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="login successfully.")
 *        )
 *     )
 * )
 */

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

        if(!$user->hasVerifiedEmail())
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'Your email address is not verified.'
            ]);
        }

        $user->tokens()->delete();
        $token = $user->createToken('user_token',['role:user'])->plainTextToken;
        return response()->json([
            'statusCode' => 1,
            'token' => $token,
            'message' => 'login successfully.'
        ],202);
    }

       /**
 * @OA\Get(
 * path="/api/logout",
 * summary="user logout",
 * tags={"user"},
 * security={ {"sanctum": {} }},
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="logout successfully.")
 *        )
 *     )
 * )
 */


    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'statusCode' => 1,
            'message' => 'logout successfully.',
        ],202);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        Password::sendResetLink($request);

        return response()->json([
            'statusCode' => 1,
            'message' => 'Reset password link sent on your email.'
        ]);
    }

           /**
 * @OA\Post(
 * path="/api/change_password",
 * summary="user change_password",
 * tags={"user"},
 * security={ {"sanctum": {} }},
* @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"current_password","new_password","new_password_confirmation"},
 *      @OA\Property(property="current_password", type="string", format="password", example="PassWord12345"),
 *      @OA\Property(property="new_password", type="string", format="password", example="password"),
 *      @OA\Property(property="new_password_confirmation", type="string", format="password", example="password")
 *    ),
 * ),
 * @OA\Response(
 *    response=200,
 *    description="",
 *    @OA\JsonContent(
 *       @OA\Property(property="message", type="string", example="changed password successfully.")
 *        )
 *     )
 * )
 */

    public function changePassword(Request $request)
    {
        $password =  $request->current_password;
        if(!Hash::check($password,$request->user()->password))
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'current password is not correct.',
            ]);
        }

        $rules = array(
            'new_password' => 'required|string|min:7',
            'new_password_confirmation' => 'required|string|min:7|same:new_password',
        );

        $messages = array(
            'new_password.required' => 'A password is required.',
            'new_password.min' => 'A password is required more than or equal 8 digits.',
            'new_password_confirmation.same' => 'Password confirmation should match password fill.',
        );

        $validator = Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            return response()->json([
                'statusCode' => 0,
                'message' => $validator->errors(),
            ]);
        }

        $password = $request->new_password;
        if(Hash::check($password,$request->user()->password))
        {
            return response()->json([
                'statusCode' => 0,
                'message' => array('new_password' => ['cannot use old password.']),
            ]);
        }

        $request->user()->password = bcrypt($request->new_password);
        $request->user()->save();
        return response()->json([
            'statusCode' => 1,
            'message' => 'password change successfully.'
        ],202);

    }

}
