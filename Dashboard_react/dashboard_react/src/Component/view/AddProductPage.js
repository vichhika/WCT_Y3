import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useForm} from "react-hook-form"
import {ProductContext} from "../Context/ProductContext";
import axios from "axios";
import server from "../../config.json";
import Item from "./Item";
import PageControl from "./PageControl";
import {AuthContext} from "../Context/AuthContext";

function AddProductPage() {
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const {authContextState} = useContext(AuthContext)
    const {register,handleSubmit} = useForm()
    const [didmount, setdidmount] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchWord,setSearchWord] = useState(null);

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
        setdidmount(false);
        setLoading(true);
        axios(server.uri + "admin_shop/components/index", {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token},
            params: {search: searchWord,component: setTitle()[0], page: contextProductState.currentPage, current_page: 10}
        }).then((response) => {
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
    }, [contextProductState.currentPage])

    const searchComponent = (data) => {
        setdidmount(false);
        setLoading(true);
        setSearchWord(data.searchWord);
        axios(server.uri + "admin_shop/components/index", {
            headers: {'Authorization': 'Bearer ' + authContextState.authentication.token},
            params: {search: data.searchWord ,component: setTitle()[0], page: contextProductState.currentPage, current_page: 10}
        }).then((response) => {
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


    const history = useHistory()
    useEffect(() => {
        if (!didmount) {
            history.push("/productList")
        }
    }, [contextProductState.componentIndex])


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

    const displayComponent = () => {
        let componentWillDisplay = []

        for (const element of contextProductState.displayComponent) {
            componentWillDisplay.push(<Item row={element} component={setTitle()[0]}
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
        <div>
            <div className="d-flex align-items-center mb-2">
                <Link to="/productList">
                    <button className="add-back-btn btn btn-default">
                        <i className="material-icons">arrow_back_ios_new</i>
                    </button>
                </Link>
                <h1 className="ml-2 mb-0">{`Add ${setTitle()[1]}`}</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div
                            className="card-header card-header-primary py-1 d-flex justify-content-between align-items-center">
                            <h4 className="card-title text-center m-0">{setTitle()[1]}</h4>

                            <form onSubmit={handleSubmit(searchComponent)}>
                                <div className="d-flex justify-content-end align-items-center">
                                    <input  {...register("searchWord")} type="text" className="form-control my-3"
                                           placeholder={`Search your ${setTitle()[1].toLowerCase()}`}/>
                                </div>
                            </form>
                        </div>
                        {showContent}
                        <PageControl loading={loading}/>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default AddProductPage;