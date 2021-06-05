import React, {useContext} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {ProductContext} from "../productContext";

function AddProductPage() {
    const {contextProductState, updateContextProductState} = useContext(ProductContext);

    const setTitle = () => {
        switch (contextProductState.componentIndex) {
            case 1:
                return ["CPU", "/cpu"]
            case 2:
                return ["Motherboard", "/motherboard"]
            case 3:
                return ["RAM", "/ram"]
            case 4:
                return ["Disk", "/disk"]
            case 5:
                return ["GPU", "/gpu"]
            case 6:
                return ["Case", ".case"]
            case 7:
                return ["Power Supply", "/power-supply"]
            case 8:
                return ["Monitor", "/monitor"]

        }
    }


    return (<>
        <div className="d-flex align-items-center mb-2">
            <Link to={setTitle()[1]}>
                <button className="add-back-btn btn btn-default">
                    <i className="material-icons">arrow_back_ios_new</i>
                </button>
            </Link>
            <h1 className="ml-2 mb-0">{`Add ${setTitle()[0]}`}</h1>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div
                        className="card-header card-header-primary py-1 d-flex justify-content-between align-items-center">
                        <h4 className="card-title text-center m-0">{setTitle()[0]}</h4>

                        <div className="d-flex justify-content-between align-items-center">
                            <input type="text" className="form-control my-3"
                                   placeholder={`Search your ${setTitle()[0].toLowerCase()}`}/>
                        </div>
                    </div>
                    <div className="card-body">

                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-primary ">
                                <th className="text-center">Name</th>
                                <th className="text-center">Model</th>
                                <th className="text-center">Detail</th>
                                <th className="text-center"/>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-center">Intel</td>
                                    <td className="text-center">Ryzen 5</td>
                                    <td className="td-actions text-center">
                                        <button className="btn btn-success">
                                            <i className="material-icons">expand_more</i>
                                        </button>
                                    </td>
                                    <td className="td-actions text-center">
                                        <button type="button" rel="tooltip"
                                                className="btn btn-success btn-simple mx-2" data-toggle="modal"
                                                data-target="#exampleModalCenter">
                                            <i className="material-icons">add</i>
                                        </button>
                                    </td>
                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Add Price on this Product</h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Product Detail.........</p>
                                                    <div className="form-group row">
                                                        <label htmlFor="staticEmail"
                                                               className="col-sm-2 col-form-label">Price</label>
                                                        <div className="col-sm-8">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">$</div>
                                                                </div>
                                                                <input type="number"
                                                                       className="form-control mt-0" min="0" id="staticEmail"/>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}

export default AddProductPage;