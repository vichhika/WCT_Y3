import React, {useContext, useEffect} from "react";
import {ProductContext} from "../productContext";
import {Link, useRouteMatch} from "react-router-dom";

function ProductList() {
    const {contextProductState,updateContextProductState} = useContext(ProductContext);
    const { path, url } = useRouteMatch();

    const setTitle = () => {
        switch (contextProductState.componentIndex){
            case 1:
                return "CPU"
            case 2:
                return "Motherboard"
            case 3:
                return "RAM"
            case 4:
                return "Disk"
            case 5:
                return "GPU"
            case 6:
                return "Case"
            case 7:
                return "Power Supply"
            case 8:
               return "Monitor"

        }
    }

    return (
        <>
            <h1>{setTitle()}</h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div
                            className="card-header card-header-primary py-1 d-flex justify-content-between align-items-center">
                            <h4 className="card-title text-center">Your {setTitle()}</h4>

                            <div className="d-flex justify-content-between align-items-center">
                                <input type="text" className="form-control " placeholder={`Search your ${setTitle().toLowerCase()}`}/>

                                <Link to={`${url}/addProduct`}>
                                    <button type="button" className="btn btn-success ml-3 my-3">Add new product</button>
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">

                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-primary ">
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Model</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Detail</th>
                                    <th className="text-center"/>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-center">Intel</td>
                                        <td className="text-center">Ryzen 5</td>
                                        <td className="text-center">$74.21</td>
                                        <td className="td-actions text-center">
                                            <button className="btn btn-success">
                                                <i className="material-icons">expand_more</i>
                                            </button>
                                        </td>
                                        <td className="td-actions text-center">
                                            <button type="button" rel="tooltip"
                                                    className="btn btn-success btn-simple mx-2">
                                                <i className="material-icons">edit</i>
                                            </button>
                                            <button type="button" rel="tooltip"
                                                    className="btn btn-danger btn-simple mx-2">
                                                <i className="material-icons">close</i>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;