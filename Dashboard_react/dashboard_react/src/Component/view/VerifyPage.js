import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import server from "./../../config.json"
import {AuthContext} from "../Context/AuthContext"
import {useHistory} from "react-router-dom";
import {CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom"

function VerifyPage() {
    const {authContextState, authUpdateContextState} = useContext(AuthContext)
    const [onProcess, setOnProcess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        checkVerify()
    }, [])

    const checkVerify = () => {
        setOnProcess(true)
        axios.get(server.uri + "is_verify", {headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}})
            .then(r => {
                setOnProcess(false)
                if (r.data.statusCode === 1) {
                    authUpdateContextState({
                        type: 'set_isVerify',
                        payload: true
                    })
                    history.push("/")
                } else {
                    authUpdateContextState({
                        type: 'set_isVerify',
                        payload: false
                    })
                }
            })
    }

    const resendVerify = () => {
        setOnProcess(true)
        axios.get(server.uri + "resend_email_verification", {headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}})
            .then(() => {
                setOnProcess(false)
            })
    }

    return (
        <div className="card w-50 mx-auto my-5">
            <div className="card-body">
                {onProcess && <CircularProgress/>}
                {authContextState.isVerify && <div>Verify</div>}
                {authContextState.isVerify || onProcess ||
                <div>Your account haven't verify please check your email <div className="card-footer">
                    <button className="btn-default btn" onClick={checkVerify}>verify</button>
                    <button className="btn-primary btn" onClick={resendVerify}>Resend</button>
                </div></div>}

            </div>
        </div>
    )
}

export default VerifyPage