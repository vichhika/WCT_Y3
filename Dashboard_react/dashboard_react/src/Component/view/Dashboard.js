import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {useHistory} from "react-router-dom";
import {ProductContext} from "../Context/ProductContext";
import {AuthContext} from "../Context/AuthContext";
import axios from "axios";
import server from "../../config.json"
import {CircularProgress} from "@material-ui/core";


function Dashboard() {
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const {authContextState, authUpdateContextState} = useContext(AuthContext)
    const [submiting, setSubmiting] = useState(false);

    const history = useHistory();
    useEffect(() => {
        updateContextProductState({
            type: 'set_componentIndex',
            payload: 0
        })
    }, [])

    const logout = () => {
        setSubmiting(true)
        axios.get(server.uri + "admin_shop/logout", {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}
        }).then(r => {
            if (r.data.statusCode === 1) {
                authUpdateContextState({
                    type: 'reset_context',
                    payload: {
                        isVerify: false,
                        authentication: {
                            isAuthentication: false,
                            token: null
                        }
                    }
                })
                history.push("/login")
            }
        }).catch(e => {
            setSubmiting(false)
        })
    }

    return (
        <div>
            {submiting ? <CircularProgress/> : <div className="d-flex justify-content-between">
                <h1>Dashboard</h1>
                <button className="btn btn-danger" onClick={logout}>logout</button>
            </div>}
        </div>
    );
}

export default Dashboard;