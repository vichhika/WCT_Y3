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

    const getSelectedCpn = () => {
        const cpn = [];
        for (let i = 0; i < contextState.selectedComponent.length; i++) {
            cpn.push(<tr className="row">
                <th className="col">{conponent[i]}</th>
                <th className="col">{contextState.selectedComponent[i].brand}</th>
                <th className="col">{contextState.selectedComponent[i].model}</th>
                <th className="col">{contextState.selectedComponent[i].price}</th>
                <th className="col">
                    <Link to="/Build">
                        <button type="button" className="btn btn-danger" onClick={() => popOutSelectedStore(i)}>
                            Delete
                        </button>
                    </Link>
                </th>
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