import React, {useContext, useEffect, useState} from "react";
import "./../../../Css/styleLogin.scss";
import {useForm} from "react-hook-form";
import server from "../../../config.json";
import {useHistory} from "react-router-dom";
import {authContext} from "../../Context/AuthContext";
import axios from "axios";
import {CircularProgress} from "@material-ui/core";

function Login() {

    document.body.style.backgroundImage = 'none';
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    let history = useHistory()

    const {register, handleSubmit, formState: {errors}} = useForm();

    let [wrongEmail, setWrongEmail] = useState(false);
    let [onSubmited, setOnSubmited] = useState(false);
    let [emailNotVerify, setEmailNotVerify] = useState(false);

    const summitToServer = data => {
        setWrongEmail(false);
        setOnSubmited(true);
        axios.post(server.uri + "login", data)
            .then(function (response) {
                if (response.data.message && response.data.message.toString().localeCompare("email  or password is incorrected.") === 0) {
                    setWrongEmail(true);
                    setOnSubmited(false);
                }
                if (response.data.token) {
                    updateAuthContext({type: "set_token", payload: response.data.token});
                    updateAuthContext({type: "set_isAuthenticated", payload: true});
                }
            }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if (contextAuthState.isAuthenticated) {
            axios.get(server.uri + "is_verify", {headers: {'Authorization': `Bearer ${contextAuthState.token}`}})
                .then(r => {
                    if (r.data.statusCode === 1) {
                        setEmailNotVerify(true);
                        updateAuthContext({type: 'setIsVerify', payload: true})
                        history.replace('/');
                    } else {
                        setEmailNotVerify(false);
                        updateAuthContext({type: 'setIsVerify', payload: false})
                        history.replace('/');
                    }
                }).catch(e => {
                console.log(e)
                setOnSubmited(false);
            })
        }
    })


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
                                       {...register("email", {required: true})}
                                       onChange={() => setWrongEmail(false)}/>
                                {errors.email && <p className="error-signup">Email is required</p>}
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                       placeholder="Password"
                                       {...register("password", {required: true})}
                                       onChange={() => setWrongEmail(false)}/>
                                {errors.password && <p className="error-signup">Password is required</p>}
                            </div>
                            {wrongEmail && <p className="error-signup">Wrong Email or Password</p>}
                            <div class="d-flex flex-column justify-content-center">
                                {emailNotVerify && <p className="error-signup">Your email address is not verified.</p>}
                                {onSubmited || <button type="submit" className="btn btn-primary">Log In</button>}
                                {onSubmited && <CircularProgress/>}
                            </div>

                            <div className="ButtonForget">
                                <a href="http://api.reabpc.digital/user/password/reset" target="_blank"
                                   rel="noopener noreferrer" className="btn btn-link"> Forget password?</a>
                            </div>
                        </form>


                    </div>


                </div>

            </div>

        </div>


    );
}

export default Login;