import React from "react"
import { useContext, useEffect, useState } from "react"
import ListSize from "./ListSize"
import ListControl from "./ListControl"
import ItemList from "./ItemList"
import { buildContext } from "./../../Context/BuildContext"
import axios from 'axios'
import useData from './../../userData.js'


function ProductList() {
    const { contextState, updatContext } = useContext(buildContext)
    const [loading, setloading] = useState(true)
    const conponent = ["CPU", "Motherboard", "RAM", "Hard-Drive", "GPU", "Case", "Power-Supply", "Monitor"]

    const componetApi = ["/cpu", "/motherboard", "/memory", "/internal-hard-drive", "/video-card", "/case", "/power-supply", "/monitor"]

    useEffect(() => {
        setloading(true);
        axios.get(`https://api-303.herokuapp.com${componetApi[contextState.component]}`)
            .then(function (response) {
                updatContext({
                    type: 'set_ComponentPayload',
                    payload: response.data
                })
                setloading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {

            });
    }, [contextState.component])

    let btnNextStyle = { visibility: "visible" };
    let btnBackStyle = { visibility: "visible" };

    btnNextStyle.visibility = contextState.component === 7 ? "hidden" : "visible";
    btnBackStyle.visibility = contextState.component === 0 ? "hidden" : "visible";

    const nextStep = () => {
        if (contextState.component < 7) {
            updatContext({
                type: 'set_step',
                payload: contextState.component + 1
            })
        }
    }

    const previouStep = () => {
        if (contextState.component > 0) {
            updatContext({
                type: 'set_step',
                payload: contextState.component - 1
            })
        }

    }

    let loaingPage;
    if (loading) {
        loaingPage = <h1>keep calm and wait our data</h1>
    } else {
        loaingPage =
            <>
                <div className="card-body pt-0">
                    <div className="filter-bar d-flex">
                        <ListSize />
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />

                            <button className="btn btn-light" type="button">
                                <i className="far fa-search"></i>
                            </button>
                        </form>
                    </div>

                    <div>
                        <ItemList/>
                    </div>

                    <div className="below-bar d-flex">
                        <div className="product_qty_instock d-flex justify-content-center">
                            <p className="mb-0">Showing 1 to {contextState.listSize} of 35 entries</p>
                        </div>
                        <ListControl />
                    </div>
                </div>

                <div className="card-footer">
                    <button type="button" style={btnBackStyle} onClick={previouStep} className="btn btn-secondary">back</button>
                    <button type="button" style={btnNextStyle} onClick={nextStep} className="btn btn-success">Next</button>
                </div>
            </>
    }

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h6 id="step_title">{conponent[contextState.component]}</h6>
            </div>
            {loaingPage}
        </div>
    );

}

export default ProductList;