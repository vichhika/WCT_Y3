import React from "react"
import {useContext, useEffect, useState} from "react"
import ListSize from "./ListSize"
import ListControl from "./ListControl"
import ItemList from "./ItemList"
import {buildContext} from "./../../Context/BuildContext"
import axios from 'axios'
import useData from './../../userData.js'
import {useHistory} from "react-router-dom";
import {lightGreen} from "@material-ui/core/colors";


function ProductList() {
    const {contextState, updatContext} = useContext(buildContext)
    const [loading, setloading] = useState(true)
    const conponent = ["CPU", "Motherboard", "RAM", "HardDrive", "GPU", "Case", "PowerSupply", "Monitor"]
    const [gotoSummer, setgotoSummer] = useState(false);
    let history = useHistory();

    if (gotoSummer) {
        history.replace('/summeryBuild')
    }

    useEffect(() => {
        setloading(true);
        setgotoSummer(false);
        if (sessionStorage.getItem("buildSave") !== null) {
            console.log("first ",  sessionStorage.getItem("buildSave"))
            console.log(sessionStorage.getItem("buildSave"))
            updatContext({
                type: 'rest_context',
                payload: JSON.parse(sessionStorage.getItem("buildSave"))
            })
            setloading(false);
        } else {
            console.log("load data from server")
            axios.get(`https://api-303.herokuapp.com/ChantraComputer`)
                .then(function (response) {
                    updatContext({
                        type: 'set_shopPayload',
                        payload: response.data
                    })
                    setloading(false);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {});
        }
    }, [])

    useEffect(() => {
        if (!loading){
            console.log("second ",  sessionStorage.getItem("buildSave"))
            sessionStorage.setItem("buildSave", JSON.stringify(contextState));
        }
    }, [contextState]);

    useEffect(() => {
        if (!loading ) {
            console.log("thirth ",  sessionStorage.getItem("buildSave"))

            let newComponet = [];
            switch (contextState.component) {
                case 0: {
                    newComponet = contextState.shopPayload.cpu
                }
                    break;
                case 1: {
                    newComponet = contextState.shopPayload.motherboard
                }
                    break;
                case 2: {
                    newComponet = contextState.shopPayload.memory
                }
                    break;
                case 3: {
                    newComponet = contextState.shopPayload.internalHardDrive
                }
                    break;
                case 4: {
                    newComponet = contextState.shopPayload.videoCard
                }
                    break;
                case 5: {
                    newComponet = contextState.shopPayload.case
                }
                    break;
                case 6: {
                    newComponet = contextState.shopPayload.powerSupply
                }
                    break;
                case 7: {
                    newComponet = contextState.shopPayload.monitor
                }
                    break;
            }
            ;
            updatContext({
                type: 'set_ComponentPayload',
                payload: newComponet
            })
        }
    }, [contextState.component, loading])

    console.log(contextState.shopPayload)
    let btnNextStyle = {visibility: "visible"};
    let btnBackStyle = {visibility: "visible"};

    btnNextStyle.visibility = contextState.component === 8 || contextState.selectedComponent[contextState.component] === null ? "hidden" : "visible";
    btnBackStyle.visibility = contextState.component === 0 ? "hidden" : "visible";


    const nextStep = () => {
        if (contextState.component < 7) {
            updatContext({
                type: 'set_step',
                payload: contextState.component + 1
            })
            updatContext({
                type: 'set_currentList',
                payload: 1
            })
        } else if (contextState.component >= 7) {

        }
    }

    const previouStep = () => {
        if (contextState.component > 0) {
            updatContext({
                type: 'set_step',
                payload: contextState.component - 1
            })
            updatContext({
                type: 'set_currentList',
                payload: 1
            })
        }

    }

    let listProduct, listControl;

    if (contextState.selectedComponent[contextState.component] === null) {
        listControl = <ListControl/>
    }

    let btnNext = contextState.component < 7 ?
        <button type="button" style={btnNextStyle} onClick={nextStep} className="btn btn-success">Next</button> :
        <button style={btnNextStyle} onClick={() => {
            updatContext({
                type: 'set_setIsBuildDone',
                payload: true
            });
            setgotoSummer(true)
        }} className="btn btn-success">Summery
        </button>


    let btn, cardfooterStyle = "card-footer ";
    if (!contextState.isBuildDone) {
        btn =
            <>
                <button type="button" style={btnBackStyle} onClick={previouStep}
                        className="btn btn-secondary">Previous
                </button>
                {
                    btnNext
                }</>

    } else {
        btn =
            <button style={btnNextStyle} onClick={() => {
                updatContext({
                    type: 'set_setIsBuildDone',
                    payload: true
                });
                setgotoSummer(true)
            }} className="btn btn-success">Summery
            </button>
        cardfooterStyle += "justify-content-center"

    }


    if (loading) {
        listProduct = <h1>keep calm and wait our data</h1>
    } else {
        listProduct =
            <>
                <div className="card-body pt-0">
                    <div>
                        <ItemList/>
                    </div>

                    <div className="below-bar d-flex">
                        {listControl}
                    </div>
                </div>

                <div className={cardfooterStyle}>
                    {btn}
                </div>
            </>
    }

    return (
        <div className="card mt-5">
            <div className="card-header mx-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 id="step_title">{conponent[contextState.component]}</h6>
                    <form className="d-flex">
                        <input
                            className="form-control mx-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />

                        <button className="btn btn-light" type="submit">
                            <i className="far fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
            {listProduct}
        </div>
    );

}

export default ProductList;