import React, {useContext, useState} from "react";
import "./../../../Css/stylesignup.scss";
import {useForm} from "react-hook-form";
import server from "../../../config.json";
import {authContext} from "../../Context/AuthContext";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";

function SignUp() {
    document.body.style.backgroundImage = 'none';
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    let history = useHistory()

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    let [usernameUsed, setUsernameUsed] = useState(false);
    let [emailUsed, setEmailUsed] = useState(false);
    let [phoneUsed, setPhoneUsed] = useState(false);
    let [phoneInvalid, setInvalidPhone] = useState(false);
    let [onSubmited, setOnSubmited] = useState(false);
    let [invalidPassword, setInvalidPassword] = useState(false);

    const summitToServer = data => {
        setEmailUsed(false);
        setPhoneUsed(false);
        setOnSubmited(true);
        axios.post(server.uri + "register", data)
            .then(function (response) {
                if(response.data.message.username && response.data.message.username.toString().localeCompare("The username has already been taken.") === 0){
                    setUsernameUsed(true);
                }
                if (response.data.message.email && response.data.message.email.toString().localeCompare("A email address is already registerd.") === 0) {
                    setEmailUsed(true);
                }
                if (response.data.message.phone && response.data.message.phone.toString().localeCompare("A phone number is already registered.") === 0) {
                    setPhoneUsed(true);
                }
                if (response.data.message.phone && response.data.message.phone.toString().localeCompare("A phone number is invalid.") === 0){
                    setInvalidPhone(true);
                }
                if (response.data.message.password && response.data.message.password.toString().localeCompare("A password is required more than or equal 8 digits.") === 0){
                    setInvalidPassword(true);
                }
                
                if (response.data.access_token) {
                    updateAuthContext({type: "set_isAuthenticated",payload: true});
                    updateAuthContext({type: "set_token",payload: response.data.access_token});
                    history.replace('/');
                }
                setOnSubmited(false);
            }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div class="container signup">
            <div className="signinbox w-50">
                <form onSubmit={handleSubmit(summitToServer)}>
                    <h1>Sign Up {contextAuthState.isAuthenticated && "SignUp successfully"}</h1>
                    <div className="form-group">
                        <label htmlFor="InputFullname">Fullname</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Fullname" {...register("fullname", {required: true})} />
                        {errors.fullname && <p className="error-signup">Fullname is required</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Username" {...register("username", {required: true})}
                               onChange={() => setUsernameUsed(false)}/>
                        {errors.username && <p className="error-signup">Username is required</p>}
                        {usernameUsed && <p className="error-signup">Username is already register</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" class="form-control"
                               placeholder="Enter email" {...register("email", {required: true})}
                               onChange={() => setEmailUsed(false)}/>
                        {errors.email && <p className="error-signup">Email is required</p>}
                        {emailUsed && <p className="error-signup">Email is already register</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPhone">Phone</label>
                        <input type="phone" className="form-control"
                               placeholder="Enter you phone number" {...register("phone", {required: true})}
                               onChange={() => {setPhoneUsed(false); setInvalidPhone(false)}}/>
                        {errors.phone && <p className="error-signup">Phone is required</p>}
                        {phoneUsed && <p className="error-signup">Phone number is already register</p>}
                        {phoneInvalid && <p className="error-signup">Phone number is Invalid</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input name="password" type="password" class="form-control"
                               placeholder="Enter Password" {...register("password", {required: true})} />
                        {errors.password && <p className="error-signup">Password is required</p>}
                        {invalidPassword && <p className="error-signup">A password is required more than or equal 8 digits.</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input name="ConfirmPassword" type="password" class="form-control"
                               placeholder="Confirm Password" {...register("password_confirmation", {
                            required: true,
                            validate: value => value === watch("password") ||
                                "The passwords do not match"
                        })}/>
                        {errors.password_confirmation && errors.password_confirmation.type === "required" &&
                        <p className="error-signup">Confirm password is required</p>}
                        {errors.password_confirmation &&
                        <p className="error-signup">{errors.password_confirmation.message}</p>}
                    </div>

                    <div className="d-flex justify-content-center">
                        {onSubmited || <button type="submit" className="btn btn-primary">Sign Up</button>}
                        {onSubmited && <CircularProgress/>}
                    </div>

                </form>

            </div>

        </div>
    );
}

export default SignUp;