import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import {useHistory} from "react-router-dom";
import {ProductContext} from "../Context/ProductContext";
import {AuthContext} from "../Context/AuthContext";
import axios from "axios";
import server from "../../config.json"
import {CircularProgress} from "@material-ui/core";

const initComponetStock = {
    cpu: 0,
    casepc: 0,
    internalharddrive: 0,
    memory: 0,
    monitor: 0,
    motherboard: 0,
    powersupply: 0,
    videocard: 0,
}

function Dashboard() {
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const {authContextState, authUpdateContextState} = useContext(AuthContext)
    const [submiting, setSubmiting] = useState(false);
    const [componentInStoke, setComponentInStock] = useState(initComponetStock);

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

    useEffect( () => {
        
        if(authContextState.isVerify){

            const config = {
                headers: {'Authorization' : 'Bearer ' + `${authContextState.authentication.token}`}
            }
            axios.get(server.uri + 'admin_shop/dashboard', config)
            .then(
                response => {
                    if(response.data.statusCode == 1){
                        let data = response.data;
                        let componentCount = {
                            cpu: data.cpu,
                            casepc: data.casepc,
                            internalharddrive: data.internalharddrive,
                            memory: data.memory,
                            monitor: data.monitor,
                            motherboard: data.motherboard,
                            powersupply: data.powersupply,
                            videocard: data.videocard,
                        }
                        setComponentInStock(componentCount);
                    }
                }
            ).catch(
                error => console.log(error)
            )

        }

    },[])

    return (
        <div>
            {submiting ? <CircularProgress/> : <div className="d-flex justify-content-between">
                <h1>Dashboard</h1>
                <button className="btn btn-danger" onClick={logout}>logout</button>
            </div>}
            {
                <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Component</th>
                    <th scope="col">Total Instock</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        Object.keys(componentInStoke).map((key,index) => {
                            return  <tr>
                                    <td>{key}</td>
                                    <td>{componentInStoke[key]}</td>
                                    </tr>
                        })
                    }
                </tbody>
                </table>

            }
        </div>
    );
}

export default Dashboard;