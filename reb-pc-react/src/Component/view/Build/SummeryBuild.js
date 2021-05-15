import React from "react"
import {useContext, useEffect, useState} from "react"
import ListSize from "./ListSize"
import ListControl from "./ListControl"
import ItemList from "./ItemList"
import {buildContext} from "./../../Context/BuildContext"
import "./../../../Css/build.scss";
import axios from 'axios'
import useData from './../../userData.js'
import ProcessBar from "./ProcessBar";
import ProductList from "./ProductList";
import {Link} from "react-router-dom";


function SummeryBuild() {
    const {contextState, updatContext} = useContext(buildContext)
    const conponent = ["CPU", "Motherboard", "RAM", "HardDrive", "GPU", "Case", "PowerSupply", "Monitor"]

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
        const cpn = [];
        for (let i = 0; i < contextState.selectedComponent.length && contextState.isBuildDone; i++) {
            const itemID = "collapse" + i
            const itemIDQ = "#" + itemID
            cpn.push(<tr className="row">
                <td className="col">{conponent[i]}</td>
                <td className="col">{contextState.selectedComponent[i].brand}</td>
                <td className="col">{contextState.selectedComponent[i].model}</td>
                <td className="col">{contextState.selectedComponent[i].price}</td>
                <td className="col">
                    <Link to="/Build">
                        <button type="button" className="btn btn-danger" onClick={() => popOutSelectedStore(i)}>
                            Delete
                        </button>
                    </Link>
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

    return (
        <div className="p-Build">
            <div className="container w-75 d-flex justify-content-center text-center">
                <h2 className="card-title mt-5">Build Custom PC</h2>
                <p className="card-text">
                    Summery pc component that you just selected.
                </p>
                <div className="card mt-5">
                    <div className="card-header mx-3">
                        <div className="d-flex justify-content-between align-items-center">

                            <table className="table">
                                <thead>
                                <tr className="row">
                                    <th className="col">Component</th>
                                    <th className="col">Brand</th>
                                    <th className="col">Model</th>
                                    <th className="col">Price</th>
                                    <th className="col"></th>
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
                </div>

            </div>
        </div>
    );

}

export default SummeryBuild;