import React, {useState} from "react";
import "./../../../Css/stylesignup.scss";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {
    document.body.style.backgroundImage = 'none';

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const token = document.head.querySelector('meta[name="csrf-token"]');

    const summitToServer = data => {
        console.log(token.getAttribute('content'))
        axios.post("http://128.199.190.255:8080/api/register", data,)
            .then(function (response) {
                console.log(response);
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
                        {errors.fullname && <p className="error-signup">Last fullname is required</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="InputUsername">Username</label>
                        <input type="text" class="form-control"
                               placeholder="Enter Username" {...register("username", {required: true})} />
                        {errors.username && <p className="error-signup">Last username is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" class="form-control"
                               placeholder="Enter email" {...register("email", {required: true})} />
                        {errors.email && <p className="error-signup">Last email is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPhone">Phone</label>
                        <input type="phone" className="form-control"
                               placeholder="Enter you phone number" {...register("phone", {required: true})} />
                        {errors.phone && <p className="error-signup">Last phone is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input name="password" type="password" class="form-control"
                               placeholder="Enter Password" {...register("password", {required: true})} />
                        {errors.password && <p className="error-signup">Last password is required</p>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input name="ConfirmPassword" type="password" class="form-control"
                               placeholder="Confirm Password" {...register("confirmPassword", {
                            required: true,
                            validate: value => value === watch("password") ||
                                "The passwords do not match"
                        })}/>
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