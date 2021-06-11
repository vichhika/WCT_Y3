import React, {useContext, useEffect, useReducer, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import server from "../../../src/config.json";
import axios from "axios";
import {ProductContext} from "../Context/ProductContext";
import {AuthContext} from "../Context/AuthContext";
import {CircularProgress} from "@material-ui/core";


function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory()

    const {authContextState, authUpdateContextState} = useContext(AuthContext)
    const [invalid, setInvalid] = useState(false);
    const [submiting, setSubmiting] = useState(false);


    useEffect(() => {
        if(authContextState.authentication.isAuthentication){
            history.push("/")
        }
    })

    const summitLogin = data => {
        setSubmiting(true)
        axios.post(server.uri + "admin_shop/login", data)
            .then(function (response) {
                console.log(response.data)
                if (response.data.statusCode === 1) {
                    authUpdateContextState({
                        type: "set_authentication",
                        payload: {
                            isAuthentication: true,
                            token: response.data.token
                        }
                    })
                    setSubmiting(false)
                    history.push("/verify")
                } else if (response.data.statusCode === 0) {
                    console.log(response.data)
                    setInvalid(true);
                }
                setSubmiting(false)
            }).catch(function (error) {
            setSubmiting(false)
        });
    }

    return (
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card my-5">
                    <div className="card-header text-center">
                        <h2 className="m-0">Login</h2>
                    </div>
                    <div className="card-body">
                        <form className="form-signin" onSubmit={handleSubmit(summitLogin)}>
                            <div className="form-label-group mb-3">
                                <label htmlFor="inputEmail" className="m-0">Email address</label>
                                <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                                       {...register("email", {required: true})}
                                       onChange={() => setInvalid(false)}/>
                                {errors.email && <p className="text-danger">Email is required</p>}
                            </div>

                            <div className="form-label-group mb-3">
                                <label htmlFor="inputPassword" className="m-0">Password</label>
                                <input type="password" id="inputPassword" className="form-control"
                                       placeholder="Password" {...register("password", {required: true})}
                                       onChange={() => setInvalid(false)}/>
                                {errors.password && <p className="text-danger">Password is required</p>}
                            </div>

                            <div className="d-flex justify-content-between">
                                <a href="http://api.reabpc.digital/admin_shop/password/reset">Forget Password?</a>
                                <Link to="/register">Create account here!</Link>
                            </div>

                            <div>
                                {invalid && <p className="text-danger">Invalid email or password</p>}
                            </div>

                            {submiting ? <div className="d-flex justify-content-center"><CircularProgress/></div> :
                                <button className="btn btn-lg btn-primary btn-block text-uppercase mt-2 mb-3"
                                        type="submit">Login
                                </button>}


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;