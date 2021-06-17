import React, { useRef } from "react"
import { useContext, useEffect, useState } from "react"
import { buildContext } from "./../../Context/BuildContext"
import "./../../../Css/build.scss";
import { useHistory, Redirect } from "react-router-dom";
import { ShopsContext } from "../../Context/ShopsContext"
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import server from "../../../config.json"
import { CircularProgress } from "@material-ui/core";


function SummeryBuild() {
    const { contextState, updatContext } = useContext(buildContext)
    const { contextAuthState, updateAuthContext } = useContext(authContext);
    const { shopsContext } = useContext(ShopsContext);
    const conponent = ["CPU", "Motherboard", "RAM", "HardDrive", "GPU", "Case", "PowerSupply", "Monitor"]
    const [isLoading, setIsLoading] = useState(true)
    const [goToBuild, setGotoBuild] = useState(false);
    const [submiting, setSubting] = useState(false);
    const [relativeBuild, setRelativeBuild] = useState([])
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

    const itemDetail = itemDetail => {
        let detail = []
        for (let [key, value] of Object.entries(itemDetail)) {
            if (key.toLowerCase().includes("id") || key.toLowerCase().includes("at")) continue
            detail.push(<p><span><span
                className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>: {value} </span></p>)
        }
        return detail
    }


    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < contextState.selectedComponent.length; i++) {
            total += contextState.selectedComponent[i].price
        }
        return total;
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
                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
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

    const releventBuild = () => {
        const adminshopID = shopsContext.selectedShop
        const cpuID = contextState.selectedComponent[0]["cpuID"]
        const motherboardID = contextState.selectedComponent[1]["motherboardID"]
        const memoryID = contextState.selectedComponent[2]["memoryID"]
        const internalharddriveID = contextState.selectedComponent[3]["internalharddriveID"]
        const videocardID = contextState.selectedComponent[4]["videocardID"]
        const casepcID = contextState.selectedComponent[5]["casepcID"]
        const powersupplyID = contextState.selectedComponent[6]["powersupplyID"]
        const monitorID = contextState.selectedComponent[7]["monitorID"]
        axios.post(server.uri + "build/relative_build", {
            adminshopID: adminshopID,
            cpuID: cpuID,
            motherboardID: motherboardID,
            memoryID: memoryID,
            internalharddriveID: internalharddriveID,
            videocardID: videocardID,
            casepcID: casepcID,
            powersupplyID: powersupplyID,
            monitorID: monitorID,
        }).then(r => {
            if (r.data.statusCode === 1) {
                setRelativeBuild(r.data.message)
            } else {
                console.log("save error")
            }
        }
        ).catch(e => {
            console.log(e)
        })
        // console.log(adminshopID, cpuID, motherboardID, memoryID, internalharddriveID, videocardID, casepcID, powersupplyID, monitorID)
    }

    useEffect(() => {
        releventBuild();
    }, [])

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
        }, { headers: { 'Authorization': `Bearer ${contextAuthState.token}` } }).then(r => {
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
    }

    const saveRelatedBuild = shopID => {
        const adminshopID = shopID
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
        }, { headers: { 'Authorization': `Bearer ${contextAuthState.token}` } }).then(r => {
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
    }

    let saveBtn = submiting ?
        <CircularProgress /> :
        <button type="button" onClick={saveBuild} className="btn btn-success">Save</button>
    let saveRelatedBtn = shopID => {
        if (submiting) {
            return <CircularProgress />; 
        }
        else{
            return <button type="button" onClick={() => saveRelatedBuild(shopID)} className="btn btn-success">Save</button>
        }

    }

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
                                            <th className="col-2">Price <span className="text-danger">${totalPrice()}</span></th>
                                            <th className="col-1" />
                                            <th className="col-1" />
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
                        <div className="card-footer pt-3">
                            <button type="button" ref={close} onClick={clearBuild} className="btn btn-secondary">Clear</button>
                            {contextAuthState.isAuthenticated && contextAuthState.isVerify && saveBtn}
                        </div>
                        <div>
                            <h2>Other Shop</h2>
                            <div className="row m-3">
                                {relativeBuild.map(relative =>
                                    <div class="card col-3">
                                        <div class="card-body">
                                            <h5 class="card-title">{relative.shop_name}</h5>
                                            <p><b>Total Price</b>: {relative.totalprice}$</p>
                                            {contextAuthState.isAuthenticated && contextAuthState.isVerify && saveRelatedBtn(relative.adminshopID)}
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SummeryBuild;