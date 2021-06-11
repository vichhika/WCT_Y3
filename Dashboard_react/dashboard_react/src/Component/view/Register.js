import React, {useContext, useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import server from "./../../config.json"
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";
import {CircularProgress} from "@material-ui/core";


function Register() {
    const {register, watch, handleSubmit, formState: {errors}} = useForm()
    const {authContextState, authUpdateContextState} = useContext(AuthContext)
    const [emailUnavailable, setEmailUnavailable] = useState(false);
    const [shopNameUnavailable, setShopNameUnavailable] = useState(false);
    const [phoneUnavailable, setPhoneUnavailable] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const history = useHistory();

    // {
    //     "shop_name": "Sok kha Computer",
    //     "phonenumber": "012812812",
    //     "email": "user1@mail.com",
    //     "password": "PassWord12345",
    //     "password_confirmation": "PassWord12345",
    //     "location": "Phnom Penh Cambodia",
    //     "profile": "Image upload"
    // }
    //access_token: "277|RsA40qzPDhWowxLKPcUU7cIrbHVZHRvbEQ1u8Xcf"

    const registerHandle = data => {
        setSubmiting(true)
        axios.post(server.uri + "admin_shop/register", data).then((response) => {

            if (response.data.access_token) {
                authUpdateContextState({
                    type: "set_authentication",
                    payload: {
                        isAuthentication: true,
                        token: response.data.access_token
                    }
                })
                history.push("/verify")
            }

            if (response.data.messages["shop_name"]) {
                setShopNameUnavailable(true)
                setSubmiting(false);
            } else {
                setShopNameUnavailable(false)
                setSubmiting(false);
            }
            if (response.data.messages["phonenumber"]) {
                setPhoneUnavailable(true)
                setSubmiting(false);
            } else {
                setPhoneUnavailable(false)
                setSubmiting(false);
            }
            if (response.data.messages["email"]) {
                setEmailUnavailable(true)
                setSubmiting(false);
            } else {
                setEmailUnavailable(false)
                setSubmiting(false);
            }

        }).catch((error) => {

        })
    }


    return (<div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card my-5">
                <div className="card-header text-center">
                    <h2 className="m-0">Register</h2>
                </div>
                <div className="card-body">
                    <form className="form-signin" onSubmit={handleSubmit(registerHandle)}>

                        <div className="form-label-group mb-3">
                            <label htmlFor="inputEmail" className="m-0">Email</label>
                            <input {...register("email", {
                                required: true
                            })} onChange={() => setEmailUnavailable(false)} type="email"
                                   className="form-control"
                            />
                            {errors.email?.type === 'required' && <p className="text-danger">Email name is required</p>}
                            {emailUnavailable && <p className="text-danger">Email already use</p>}
                        </div>
                        <div className="form-label-group mb-3">
                            <label htmlFor="inputEmail" className="m-0">Phone Number</label>
                            <input {...register("phonenumber", {required: true, pattern: /^0[0-9]{8,9}$/})} type="tel"
                                   onChange={() => setPhoneUnavailable(false)} className="form-control"
                            />
                            {errors.phonenumber?.type === 'required' &&
                            <p className="text-danger">Phone Number is required</p>}
                            {errors.phonenumber?.type === 'pattern' &&
                            <p className="text-danger">Phone Number is invalid</p>}
                            {phoneUnavailable && <p className="text-danger">Phone number already use</p>}
                        </div>
                        <div className="form-label-group mb-3">
                            <label htmlFor="inputEmail" className="m-0">Shop Name</label>
                            <input {...register("shop_name", {required: true, maxLength: 55})} type="text"
                                   onChange={() => setShopNameUnavailable(false)} className="form-control"
                            />
                            {errors.shop_name?.type === 'required' &&
                            <p className="text-danger">Shop name is required</p>}
                            {shopNameUnavailable && <p className="text-danger">Shop name already use</p>}
                        </div>
                        <div className="form-row">
                            <div className="col form-label-group mb-3">
                                <label htmlFor="inputEmail" className="m-0">Location</label>
                                <input {...register("location")} placeholder="option" type="text"
                                       className="form-control"
                                />
                            </div>
                            <div className="col form-label-group mb-3">
                                <label htmlFor="inputEmail" className="m-0">Profile</label>
                                <input {...register("profile")} placeholder="option" type="text"
                                       className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-label-group mb-3">
                            <label htmlFor="inputEmail" className="m-0">Password</label>
                            <input {...register("password", {
                                required: true,
                                minLength: 8,
                                validate: {passwordNotMatch: value => value === watch("password_confirmation") || "The passwords do not match"}
                            })} type="password"
                                   className="form-control"
                            />
                            {errors.password?.type === 'required' &&
                            <p className="text-danger">Password is required</p>}
                            {errors.password?.type === 'minLength' &&
                            <p className="text-danger">Password at least 8</p>}
                            {errors.password?.type === 'passwordNotMatch' &&
                            <p className="text-danger">Confirm Password and Password not match</p>}
                        </div>

                        <div className="form-label-group mb-3">
                            <label htmlFor="inputEmail" className="m-0">Confirm Password</label>
                            <input {...register("password_confirmation", {
                                required: true,
                                minLength: 8,
                                validate: {passwordNotMatch: value => value === watch("password") || "The passwords do not match"}
                            })} type="password"
                                   className="form-control"
                            />
                            {errors.password_confirmation?.type === 'required' &&
                            <p className="text-danger">Confirm Password is required</p>}
                            {errors.password_confirmation?.type === 'minLength' &&
                            <p className="text-danger">Confirm Password at lest 8 digit</p>}
                            {errors.password_confirmation?.type === 'passwordNotMatch' &&
                            <p className="text-danger">Confirm Password and Password not match</p>}
                        </div>

                        <div className="d-flex justify-content-end">
                            <Link to="/login">Back to login</Link>
                        </div>

                        {submiting ? <div className="d-flex justify-content-center"><CircularProgress/> </div> :
                            <button className="btn btn-lg btn-primary btn-block text-uppercase mt-2 mb-3"
                                    type="submit">Register
                            </button>}


                    </form>
                </div>
            </div>
        </div>
    </div>)
}

export default Register;