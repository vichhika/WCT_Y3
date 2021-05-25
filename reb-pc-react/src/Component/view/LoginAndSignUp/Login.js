import React, {useContext, useState} from "react";
import "./../../../Css/styleLogin.scss";
import {useForm} from "react-hook-form";
import server from "../../../config.json";
import {useHistory} from "react-router-dom";
import {authContext} from "../../Context/AuthContext";
import axios from "axios";

function Login() {
    document.body.style.backgroundImage = 'none';
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    let history = useHistory()

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    let [wrongEmail, setWrongEmail] = useState(false);
    let [wrongPassword, setWrongPassword] = useState(false);
    let [onSubmited, setOnSubmited] = useState(false);


    const summitToServer = data => {
        setWrongEmail(false);
        setWrongPassword(false);
        setOnSubmited(true);
        axios.post(server.uri + "login", data)
            .then(function (response) {
                if (response.data.email && response.data.email.toString().localeCompare("A email address is already registerd.") === 0) {
                    setWrongEmail(true);
                }
                if (response.data.phone && response.data.phone.toString().localeCompare("A phone number is already registered.") === 0) {
                    setWrongPassword(true);
                }
                if (response.data.access_token) {
                    sessionStorage.setItem("token", response.data.access_token);
                    updateAuthContext({type: "set_isAuthenticated",payload: true});
                    history.replace('/');
                }
                setOnSubmited(false);
            }).catch(function (error) {
            console.log(error);
        });

    }

    return (

        <div class="container login" style={{marginTop: '150px'}}>

            <div class="row">
                <div class="col-sm">


                    <div class="loginbox">
                        <form onSubmit={handleSubmit(summitToServer)}>
                            <h1>Log in</h1>
                            <div class="form-group ">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email"
                                       {...register("email", {required: true})}  />
                                {errors.email && <p className="error-signup">Email is required</p>}
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                       placeholder="Password"
                                       {...register("password", {required: true})}/>
                                {errors.password && <p className="error-signup">Password is required</p>}
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>

                            <div className="ButtonForget">
                                <button type="button" className="btn btn-link"> Forget password?</button>
                            </div>
                        </form>


                    </div>


                </div>

            </div>

        </div>


    );
}

export default Login;