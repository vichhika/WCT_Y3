import React, {useContext, useEffect, useState} from "react";
import {ProductContext} from "../Context/ProductContext";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageControl from "./PageControl";
import axios from "axios";
import server from "../../config.json";
import {AuthContext} from "../Context/AuthContext";
import ProdunctListItem from "./ProductListItem";
import {useForm} from "react-hook-form"


function ProductList() {
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const {register,handleSubmit} = useForm()
    const {authContextState} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [didmount, setdidmount] = useState(true);
    const [searchWord, setSearchWord] = useState(null);
    const [switchPanel, setSwitchPanel] = useState(false);
    const history = useHistory()


    useEffect(() => {
        updateContextProductState({
            type: "set_currentPage",
            payload: 1
        })
        updateContextProductState({
            type: "set_totalPage",
            payload: undefined
        })
        updateContextProductState({
            type: "set_displayComponent",
            payload: []
        })
    }, [])

    useEffect(() => {
        if (!didmount) {
            history.push("/productList")
        }
    }, [contextProductState.componentIndex])

    useEffect(() => {
        setdidmount(false);
        setLoading(true);
        console.log(setTitle()[0])
        axios(server.uri + "admin_shop/index", {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token},
            params: {
                search: searchWord,
                component: setTitle()[0],
                page: contextProductState.currentPage,
                current_page: 10
            }
        }).then((response) => {
            setSearchWord(null)
            updateContextProductState({
                type: "set_totalPage",
                payload: response.data.total_page
            })
            updateContextProductState({
                type: "set_displayComponent",
                payload: response.data.message
            })
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }, [contextProductState.currentPage, contextProductState.componentIndex])

    const setTitle = () => {
        switch (contextProductState.componentIndex) {
            case 1:
                return ["cpu", "CPU"]
            case 2:
                return ["motherboard", "Motherboard"]
            case 3:
                return ["memory", "Ram"]
            case 4:
                return ["internalharddrive", "Disk"]
            case 5:
                return ["videocard", "GPU"]
            case 6:
                return ["casepc", "Case"]
            case 7:
                return ["powersupply", "Power-supply"]
            case 8:
                return ["monitor", "Monitor"]

        }
    }

    const searchComponent = (data) => {
        setdidmount(false);
        setLoading(true);
        setSearchWord(data.searchWord);
        axios(server.uri + "admin_shop/index", {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token},
            params: {search: data.searchWord ,component: setTitle()[0], page: contextProductState.currentPage, current_page: 10}
        }).then((response) => {
            setSearchWord(null)
            updateContextProductState({
                type: "set_totalPage",
                payload: response.data.total_page
            })
            updateContextProductState({
                type: "set_displayComponent",
                payload: response.data.message
            })
            updateContextProductState({
                type: "set_currentPage",
                payload:1
            })
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const displayComponent = () => {
        let componentWillDisplay = []

        for (const element of contextProductState.displayComponent) {
            componentWillDisplay.push(<ProdunctListItem row={element}
                                                        component={setTitle()[0]}
                                                        componentIndex={contextProductState.componentIndex}/>)
        }
        return componentWillDisplay
    }

    const showContent = !loading ?
        <div className="card-body m-3 p-0">
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
                    {didmount || displayComponent()}
                    </tbody>
                </table>
            </div>
        </div> :
        <div className="loading-pannel w-100 m-3 p-0 d-flex justify-content-center align-items-center"><CircularProgress
            size="5rem"/></div>

    return (
        <>
            <h1>{setTitle()[1]}</h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div
                            className="card-header card-header-primary py-1 d-flex justify-content-between align-items-center">
                            <h4 className="card-title text-center">Your {setTitle()[1]}</h4>

                            <div className="d-flex justify-content-center align-items-center">
                                <form onSubmit={handleSubmit(searchComponent)}>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <input  {...register("searchWord")} type="text" className="form-control my-3"
                                                placeholder={`Search your ${setTitle()[1].toLowerCase()}`}/>
                                    </div>
                                </form>
                                <Link to="/addProduct"><button className="btn btn-success">Add Product</button></Link>

                            </div>

                        </div>
                        {contextProductState.displayComponent.length !== 0 ? <> {showContent} {contextProductState.totalPage !== 1 ?
                            <PageControl loading={loading}/> : <></>} </> :
                            <div className="d-flex justify-content-center m-5"><h1>Empty</h1></div>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;