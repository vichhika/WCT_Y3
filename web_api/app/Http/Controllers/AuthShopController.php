<?php

namespace App\Http\Controllers;

use App\Models\Adminshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthShopController extends Controller
{
    /**
 * @OA\Post(
 * path="/api/admin_shop/register",
 * summary="shop owner register",
 * tags={"shop"},
 * @OA\RequestBody(
 *    required=true,
 *    @OA\JsonContent(
 *       required={"shop_name","phonenumber","email","password","password_confirmation"},
 *      @OA\Property(property="shop_name", type="string", format="string", example="Sok kha Computer"),
 *      @OA\Property(property="phonenumber", type="string", format="phone", example="012812812"),
 *      @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
 *      @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
 *      @OA\Property(property="password_confirmation", type="string", format="password_confirmation", example="PassWord12345"),
 *      @OA\Property(property="location", type="string", format="string", example="Phnom Penh Cambodia"),
 *      @OA\Property(property="profile", type="image", format="image", example="Image upload"),
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

    public function register(Request $request)
    {
        $rules = array(
            'shop_name' => 'required|string|max:55|unique:adminshops',
            'phonenumber' => 'required|string|unique:adminshops|regex:/^0[0-9]{1,9}/',
            'email' => 'required|email|unique:adminshops',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|min:8|same:password',
        );

        $messages = array(
            'shop_name.required' => 'A fullname is required.',
            'shop_name.unique' => 'shop name already used.',
            'shop_name.max' => 'A fullname maximun input 55 characters.',
            'phonenumber.required' => 'A phone number is required.',
            'phonenumber.regex' => 'A phone number is invalid.',
            'phonenumber.unique' => 'A phone number is already registered.',
            'email.required' => 'A email address is required.',
            'email.email' => 'A email address is invalid.',
            'email.unique' => 'A email address is already registerd.',
            'password.required' => 'A password is required.',
            'password.min' => 'A password is required more than or equal 8 digits.',
            'password_confirmation.same' => 'Password confirmation should match pasasword fill.',
        );

        $validator = Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            return response()->json([
                'statusCode' => 0,
                'messages' => $validator->errors(),
            ]);
        }else
        {
            $adminShop = new Adminshop([
                'shop_name' => $request->get('shop_name'),
                'phonenumber' => $request->get('phonenumber'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
                'location' => $request->get('location'),
                'profile'  => $request->get('profile'),
            ]);
            $adminShop->save();
            $token = $adminShop->createToken('shopToken',['role:adminShop'])->plainTextToken;
            $adminShop->sendEmailVerificationNotification(); // please create shop owner templete email
            return response()->json([
                'statusCode' => 1,
                'access_token' => $token,
                'message' => 'Email sent! please comfirm your email at your inbox message.',
            ],201);
        }
    }

    /**
 * @OA\Post(
 * path="/api/admin_shop/login",
 * summary="shop owner login",
 * tags={"shop"},
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

    public function login(Request $request)
    {
        $adminShop = Adminshop::where('email', $request->email)->first();
        if(!$adminShop || !Hash::check($request->password, $adminShop->password))
        {
            return response()->json([
                'statusCode' => 0,
                'message' => 'wrong password.'
            ]);
        }
        $adminShop->tokens()->delete();
        $token = $adminShop->createToken('shop_token',['role:adminShop'])->plainTextToken;
        return response()->json([
            'statusCode' => 1,
            'token' => $token,
            'message' => 'login successfully.'
        ],202);
    }

 /**
 * @OA\Get(
 * path="/api/admin_shop/logout",
 * summary="shop owner logout",
 * tags={"shop"},
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

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'statusCode' => 1,
            'message' => 'logout successfully.',
        ],202);

    }

    public function forgotPassword(Request $request)
    {
        return response()->json([
            'statusCode' => 1,
        ]);
    }

              /**
 * @OA\Post(
 * path="/api/admin_shop/change_password",
 * summary="shop owner change_password",
 * tags={"shop"},
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
            ],202);
        }
    }
}
