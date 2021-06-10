import React, {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form"
import server from "./../../config.json"
import axios from "axios";
import {AuthContext} from "../Context/AuthContext";
import {useHistory} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

function Item(props) {

    const {register, handleSubmit} = useForm()
    const {authContextState} = useContext(AuthContext)
    const submitRef = useRef();
    const closeModelRef = useRef();
    const history = useHistory()
    const [submiting, setSubting] = useState(false);
    const [summitError, setSummitError] = useState(false)

    const itemDetail = () => {
        let detail = []
        for (let [key, value] of Object.entries(props.row)) {
            if (key.indexOf('ID') > -1) continue
            detail.push(<p><span
                className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1) + ":"}</span> {value} </p>)
        }
        return detail
    }

    const submithandler = (data) => {
        let submitdata = {
            price: data.price,
            component: props.component
        }
        submitdata[Object.entries(props.row)[0][0]] = Object.entries(props.row)[0][1]

        setSubting(true)
        axios.post(server.uri + "admin_shop/store", submitdata, {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token}
        }).then(response => {
            setSubting(false)
            if (response.data.statusCode === 0) {
                setSummitError(true)
            } else {
                closeModelRef.current.click()
                history.push("/productList")
            }
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
    let addComponent = "#addComponent" + id;


    return (
        <tr key={id + ""}>
            <td className="text-center">{props.row.brand}</td>
            <td className="text-center">{props.row.model}</td>
            <td className="td-actions text-center">
                <button className="btn btn-success" data-toggle="modal"
                        data-target={showDetail}>
                    <i className="material-icons">expand_more</i>
                </button>
            </td>
            <td className="td-actions text-center">
                <button type="button"
                        className="btn btn-success btn-simple mx-2 " data-toggle="modal"
                        data-target={addComponent}>
                    <i className="material-icons">add</i>
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
                            <button type="button" className="btn btn-primary">Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={addComponent.substring(1)} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add Price on
                                this {props.component}</h5>
                            <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Component: {props.row.brand} {props.row.model}</p>
                            <form onSubmit={handleSubmit(submithandler)} className="form-group row">
                                <label htmlFor="staticEmail"
                                       className="col-sm-2 col-form-label">Price</label>
                                <div className="col-sm-8">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input type="number" {...register('price')}
                                               className="form-control mt-0" min="1"/>
                                    </div>
                                </div>
                                <button class="d-none" ref={submitRef} type="submit"/>
                            </form>
                            {summitError && <p className="my-2 text-danger">You already add this component</p>}
                        </div>
                        <div className="modal-footer">
                            {submiting ? <CircularProgress/> : <>
                                <button type="button" ref={closeModelRef} className="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={() => submitRef.current.click()}
                                        className="btn btn-primary">Add
                                </button>
                            </>}
                        </div>
                    </div>
                </div>
            </div>

        </tr>

    )
}

export default Item;