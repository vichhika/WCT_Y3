import React, {useState} from "react";
import "./../../../Css/stylesignup.scss";
import {useForm} from "react-hook-form";
import server from "../../../config.json";
import axios from "axios";

function SignUp() {
    document.body.style.backgroundImage = 'none';

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    let [emailUsed,setEmailUsed] = useState(false);
    let [phoneUsed,setPhoneUsed] = useState(false);

    const summitToServer = data => {
        setEmailUsed(false);
        setPhoneUsed(false);
        axios.post(server.uri+"register", data)
            .then(function (response) {
                if (response.data.email && response.data.email.toString().localeCompare("A email address is already registerd.") === 0){
                    setEmailUsed(true);
                }
                if (response.data.phone && response.data.phone.toString().localeCompare("A phone number is already registered.") === 0){
                    setPhoneUsed(true);
                }
                if (response.data.access_token){
                    sessionStorage.setItem("token",response.data.access_token);
                }
            }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div class="container signup">

            <div className="signinbox w-50">

                <form onSubmit={handleSubmit(summitToServer)}>
                    <h1>Sign Up</h1>
                    <div className="form-group">
                        <label htmlFor="InputFullname">Fullname</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Fullname" {...register("fullname", {required: true})} />
                        {errors.fullname && <p className="error-signup">Fullname is required</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Username" {...register("username", {required: true})} />
                        {errors.username && <p className="error-signup">Username is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" class="form-control"
                               placeholder="Enter email" {...register("email", {required: true})} />
                        {errors.email && <p className="error-signup">Email is required</p>}
                        {emailUsed && <p className="error-signup">Email is already register</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPhone">Phone</label>
                        <input type="phone" className="form-control"
                               placeholder="Enter you phone number" {...register("phone", {required: true})} />
                        {errors.phone && <p className="error-signup">Phone is required</p>}
                        {phoneUsed && <p className="error-signup">Phone number is already register</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input name="password" type="password" class="form-control"
                               placeholder="Enter Password" {...register("password", {required: true})} />
                        {errors.password && <p className="error-signup">Password is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input name="ConfirmPassword" type="password" class="form-control"
                               placeholder="Confirm Password" {...register("confirmPassword", {
                            required: true,
                            validate: value => value === watch("password") ||
                                "The passwords do not match"
                        })}/>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && <p className="error-signup">Confirm password is required</p>}
                        {errors.confirmPassword && <p className="error-signup">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </div>

                </form>

            </div>

        </div>


    );
}

export default SignUp;