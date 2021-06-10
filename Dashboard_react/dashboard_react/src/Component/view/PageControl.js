import React, {useContext} from "react";
import {ProductContext} from "../Context/ProductContext";

function PageControl(props){

    const {contextProductState, updateContextProductState} = useContext(ProductContext);

    const changeListIndex = i => {
        if (!props.loading){
            updateContextProductState({
                type: "set_currentPage",
                payload: i
            })
        }
    }

    const nextListIndex = () => {
        if(contextProductState.currentPage < contextProductState.totalPage && !props.loading){
            updateContextProductState({
                type: "set_currentPage",
                payload: ++contextProductState.currentPage
            })
        }
    }
    const backListIndex = () => {
        if (contextProductState.currentPage > 1 && !props.loading){
            updateContextProductState({
                type: "set_currentPage",
                payload: --contextProductState.currentPage
            })
        }
    }

    const btn = () => {

        let btns = []

        const btnpushing = i => {
            let btnClassname = "btn btn-outline-secondary"
            if (i === contextProductState.currentPage){
                btnClassname += " active"
            }
            btns.push(<button type="button" onClick={() => changeListIndex(i)}
                              className={btnClassname}>{i}</button>)

        }


        if (contextProductState.currentPage <= 3 || contextProductState.totalPage <= 5) {
            let List = Math.min(5,contextProductState.totalPage)
            for (let i = 1; i <= List; i++) {
                btnpushing(i);
            }
        } else if (contextProductState.currentPage > 3 && contextProductState.currentPage <= contextProductState.totalPage - 3) {
            for (let i = contextProductState.currentPage - 2; i <= contextProductState.currentPage + 2; i++) {
                btnpushing(i);
            }
        } else if (contextProductState.currentPage > contextProductState.totalPage - 3) {
            for (let i = contextProductState.totalPage - 4; i <= contextProductState.totalPage; i++) {
                btnpushing(i);
            }
        }

        return btns;
    }




    return(
        <div className="card-footer justify-content-end">
            <div className="btn-group" role="group" aria-label="First group">
                <button type="button" onClick={() => changeListIndex(1)} className="btn btn-default">&lt;&lt;</button>
                <button type="button" onClick={() => backListIndex()} className="btn btn-default">&lt;</button>
                    {btn()}
                <button type="button" onClick={() => nextListIndex()} className="btn btn-default">&gt;</button>
                <button type="button" onClick={() => changeListIndex(contextProductState.totalPage)} className="btn btn-default">&gt;&gt;</button>
            </div>
        </div>
    )
}

export default PageControl;