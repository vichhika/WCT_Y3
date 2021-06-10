import React, {useContext, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form"
import server from "./../../config.json"
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import {ProductContext} from "../Context/ProductContext";
import CircularProgress from "@material-ui/core/CircularProgress";

function ProdunctListItem(props) {

    const {register, handleSubmit} = useForm()
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const {authContextState} = useContext(AuthContext)
    const [submiting,setSubmiting] = useState(false);
    const submitRef = useRef();
    const closeModelRef = useRef();
    const closeModelDeleteRef = useRef();

    const itemDetail = () => {
        let detail = []
        for (let [key, value] of Object.entries(props.row)) {
            if (key.indexOf('ID') > -1) continue
            detail.push(<p><span
                className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1) + ":"}</span> {value} </p>)
        }
        return detail
    }


    const submitEditHandler = (data) => {
        let submitdata = {
            component: props.component,
            price: data.price
        }
        submitdata[Object.entries(props.row)[1][0]] = Object.entries(props.row)[1][1]
        console.log(submitdata)
        setSubmiting(true)
        axios.post(server.uri + "admin_shop/update", submitdata, {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}
        }).then(response => {
            let tmp = contextProductState.displayComponent;
            tmp.find(o => o[Object.entries(props.row)[1][0]] === id).price = parseInt(submitdata.price);
            setSubmiting(false)
            closeModelRef.current.click()
            updateContextProductState({
                type: 'set_displayComponent',
                payload: tmp
            })
        })
    }

    const submitDeleteHandler = (data) => {
        let submitdata = {
            component: props.component
        }
        submitdata[Object.entries(props.row)[1][0]] = Object.entries(props.row)[1][1]
        console.log(submitdata)
        setSubmiting(true)
        axios.post(server.uri + "admin_shop/destroy", submitdata, {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}
        }).then(response => {
            let tmp = contextProductState.displayComponent;
            tmp.splice(tmp.indexOf(tmp.find(o => o[Object.entries(props.row)[0][0]] === id)),1)
            setSubmiting(false)
            closeModelDeleteRef.current.click()
            updateContextProductState({
                type: 'set_displayComponent',
                payload: tmp
            })

        })
    }

    let id;
    switch (props.componentIndex) {
        case 1:
            id = props.row.cpuID;
            break;
        case 2:
            id = props.row.motherboardID;
            break;
        case 3:
            id = props.row.memoryID;
            break;
        case 4:
            id = props.row.internalharddriveID;
            break;
        case 5:
            id = props.row.videocardID;
            break;
        case 6:
            id = props.row.casepcID;
            break;
        case 7:
            id = props.row.powersupplyID;
            break;
        case 8:
            id = props.row.monitorID;
            break;
    }

    let showDetail = "#showDetail" + id;
    let editComponent = "#editComponent" + id;
    let deleteComponent = "#deleteComponent" + id;

    return (
        <tr key={id + ""}>
            <td className="text-center">{props.row.brand}</td>
            <td className="text-center">{props.row.model}</td>
            <td className="text-center">{props.row.price} $</td>
            <td className="td-actions text-center">
                <button className="btn btn-success" data-toggle="modal"
                        data-target={showDetail}>
                    <i className="material-icons">expand_more</i>
                </button>
            </td>
            <td className="td-actions text-center">
                <button type="button" rel="tooltip" data-toggle="modal"
                        data-target={editComponent}
                        className="btn btn-success btn-simple mx-2">
                    <i className="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" data-toggle="modal"
                        data-target={deleteComponent}
                        className="btn btn-danger btn-simple mx-2">
                    <i className="material-icons">close</i>
                </button>
            </td>

            <div className="modal fade" id={showDetail.substring(1)} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add Price on
                                this Product</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {itemDetail()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={editComponent.substring(1)} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Price on
                                this {props.component}</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Component: {props.row.brand} {props.row.model}</p>
                            <form onSubmit={handleSubmit(submitEditHandler)} className="form-group row">
                                <label htmlFor="staticEmail"
                                       className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-8">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input placeholder={props.row.price} type="number" {...register('price')}
                                               className="form-control mt-0" min="1"/>
                                    </div>
                                </div>
                                <button class="d-none" ref={submitRef} type="submit"/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {submiting ? <CircularProgress/> : <>
                                <button type="button" ref={closeModelRef} className="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={() => submitRef.current.click()}
                                        className="btn btn-primary">Edit
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={deleteComponent.substring(1)} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Delete
                                this {props.component}</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Delete component: {props.row.brand} {props.row.model} </p>
                            <p>	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;price: {props.row.price} $</p>

                        </div>
                        <div className="modal-footer">
                            {submiting ? <CircularProgress/> : <>
                                <button type="button" ref={closeModelDeleteRef} className="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={submitDeleteHandler}
                                        className="btn btn-danger">Delete
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            </div>

        </tr>

    )

}

export default ProdunctListItem;