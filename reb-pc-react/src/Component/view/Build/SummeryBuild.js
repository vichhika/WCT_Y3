import React, {useRef} from "react"
import {useContext, useEffect, useState} from "react"
import {buildContext} from "./../../Context/BuildContext"
import "./../../../Css/build.scss";
import {useHistory, Redirect} from "react-router-dom";
import {ShopsContext} from "../../Context/ShopsContext"
import {authContext} from "../../Context/AuthContext";
import axios from "axios";
import server from "../../../config.json"
import {CircularProgress} from "@material-ui/core";


function SummeryBuild() {
    const {contextState, updatContext} = useContext(buildContext)
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    const {shopsContext} = useContext(ShopsContext);
    const conponent = ["CPU", "Motherboard", "RAM", "HardDrive", "GPU", "Case", "PowerSupply", "Monitor"]
    const [isLoading, setIsLoading] = useState(true)
    const [goToBuild, setGotoBuild] = useState(false);
    const [submiting, setSubting] = useState(false);
    let history = useHistory()
    const close = useRef()

    if (goToBuild) {
        history.replace('/build');
    }

    useEffect(() => {
        setGotoBuild(false)
        updatContext({
            type: 'rest_context',
            payload: JSON.parse(sessionStorage.getItem("buildSave"))
        })
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            sessionStorage.setItem("buildSave", JSON.stringify(contextState));
        }
    }, [contextState])

    const itemDetail = (itemDetail) => {
        let detail = []
        for (let [key, value] of Object.entries(itemDetail)) {
            if (key === "_id" || key === "index") continue
            detail.push(<p><span><span
                className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>: {value} </span></p>)
        }
        return detail
    }


    const getSelectedCpn = () => {
        if (!isLoading) {
            const cpn = [];
            for (let i = 0; i < contextState.selectedComponent.length; i++) {
                const itemID = "collapse" + i
                const itemIDQ = "#" + itemID
                cpn.push(<tr className="row">
                    <td className="col-2">{conponent[i]}</td>
                    <td className="col-3">{contextState.selectedComponent[i].brand}</td>
                    <td className="col-3">{contextState.selectedComponent[i].model}</td>
                    <td className="col-2">{contextState.selectedComponent[i].price}$</td>
                    <td className="col-1">
                        <button type="button" className="btn btn-danger" onClick={() => {
                            popOutSelectedStore(i)
                            setGotoBuild(true)
                        }}>
                            Delete
                        </button>
                    </td>
                    <td className="col-1">
                        <button className="btn mx-4" data-toggle="collapse" data-target={itemIDQ} aria-expanded="true"
                                aria-controls={itemIDQ}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                            </svg>
                        </button>
                    </td>
                    <div id={itemID} className="collapse col-12" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body d-flex justify-content-around">

                            {itemDetail(contextState.selectedComponent[i])}

                        </div>
                    </div>
                </tr>)
            }
            return cpn;
        }
    }

    const popOutSelectedStore = (i) => {
        const store = contextState.selectedComponent
        store[i] = null
        updatContext({
            type: 'set_SelectedComponent',
            payload: store
        });
        updatContext({
            type: 'set_step',
            payload: i
        })
    }

    const clearBuild = () => {
        console.log("hook")
        sessionStorage.removeItem("buildSave")
        updatContext({
            type: 'init_context'
        })
        setIsLoading(true)
        setGotoBuild(true)
    }

    const saveBuild = () => {
        const adminshopID = shopsContext.selectedShop
        const cpuID = contextState.selectedComponent[0]["cpuID"]
        const motherboardID = contextState.selectedComponent[1]["motherboardID"]
        const memoryID = contextState.selectedComponent[2]["memoryID"]
        const internalharddriveID = contextState.selectedComponent[3]["internalharddriveID"]
        const videocardID = contextState.selectedComponent[4]["videocardID"]
        const casepcID = contextState.selectedComponent[5]["casepcID"]
        const powersupplyID = contextState.selectedComponent[6]["powersupplyID"]
        const monitorID = contextState.selectedComponent[7]["monitorID"]
        setSubting(true)
        axios.post(server.uri + "build/save", {
            adminshopID: adminshopID,
            cpuID: cpuID,
            motherboardID: motherboardID,
            memoryID: memoryID,
            internalharddriveID: internalharddriveID,
            videocardID: videocardID,
            casepcID: casepcID,
            powersupplyID: powersupplyID,
            monitorID: monitorID,
        }, {headers: {'Authorization': `Bearer ${contextAuthState.token}`}}).then(r => {
                if (r.data.statusCode === 1) {
                    console.log("save done")
                    close.current.click();
                } else {
                    console.log("save error")
                }
                setSubting(false)
            }
        ).catch(e => {
            console.log(e)
            setSubting(false)
        })
        // console.log(adminshopID, cpuID, motherboardID, memoryID, internalharddriveID, videocardID, casepcID, powersupplyID, monitorID)
    }

    // {cpupriceID: 1, cpuID: 1, adminshopID: 1, price: 85, created_at: null, …}
    // SummeryBuild.js:116 {motherboardpriceID: 2, motherboardID: 2, adminshopID: 1, price: 80, brand: "ASRock", …}
    // SummeryBuild.js:116 {memorypriceID: 3, memoryID: 3, adminshopID: 1, price: 39, brand: "ADATA", …}
    // SummeryBuild.js:116 {internalharddrivepriceID: 4, internalharddriveID: 4, adminshopID: 1, price: 33, brand: "ADATA", …}
    // SummeryBuild.js:116 {videocardpriceID: 2, videocardID: 2, adminshopID: 1, price: 600, brand: "AMD", …}
    // SummeryBuild.js:116 {casepcpriceID: 3, casepcID: 3, adminshopID: 1, price: 53, brand: "ADATA", …}
    // SummeryBuild.js:116 {powersupplypriceID: 2, powersupplyID: 2, adminshopID: 1, price: 120, brand: "ADATA", …}
    // SummeryBuild.js:116 {monitorpriceID: 1, monitorID: 1, adminshopID: 1, price: 95, brand: "AOC", …}

    let saveBtn = submiting ?
        <CircularProgress/> :
        <button type="button" onClick={saveBuild} className="btn btn-success">Save</button>

    if (goToBuild) {
        return <></>
    } else {
        return (
            <div className="p-Build">
                <div className="container w-75 d-flex justify-content-center text-center">
                    <h2 class="card-title mt-5">Build Custom PC at {shopsContext.shopName}</h2>
                    <div className="card mt-5">
                        <div className="card-header mx-3">
                            <div className="d-flex justify-content-between align-items-center">

                                <table className="table">
                                    <thead>
                                    <tr className="row">
                                        <th className="col-2">Component</th>
                                        <th className="col-3">Brand</th>
                                        <th className="col-3">Model</th>
                                        <th className="col-2">Price</th>
                                        <th className="col-1"/>
                                        <th className="col-1"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        getSelectedCpn()
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer pt-0">
                            <button type="button" ref={close} onClick={clearBuild} className="btn btn-secondary">Clear</button>
                            {contextAuthState.isAuthenticated && contextAuthState.isVerify && saveBtn}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SummeryBuild;