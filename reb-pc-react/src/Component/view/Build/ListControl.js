import React, {useContext} from 'react'
import {buildContext} from "../../Context/BuildContext";
import Item from "./Item";

export default function ListControl(pros) {
    const {contextState, updatContext} = useContext(buildContext)

    let lastIndex = Math.min(contextState.currentList * 10 , pros.display.length);
    let startIndex = Math.max(lastIndex - 10, 0);


    const nextList = () => {
        if (Math.ceil(pros.display.length / 10) > contextState.currentList) {
            updatContext({
                type: 'set_currentList',
                payload: contextState.currentList + 1
            })
        }
    }

    const previousList = () => {
        if (contextState.currentList > 1) {
            updatContext({
                type: 'set_currentList',
                payload: contextState.currentList - 1
            })
        }
    }

    const setCuttentList = listNum => {
        updatContext({
            type: 'set_currentList',
            payload: listNum
        })
    }

    const btns = () => {

        let totleList = Math.ceil(pros.display.length / 10);

        const btnpushing = i => {
            let btnClassname = "btn btn-outline-secondary"
            if (i == contextState.currentList){
                btnClassname += " active"
            }

            console.log(btnClassname)

            btns.push(<button type="button" onClick={() => setCuttentList(i)}
                              className={btnClassname}>{i}</button>)
        }

        let btns = []

        btns.push(<button type="button" onClick={() => setCuttentList(1)} className="btn btn-secondary">First</button>,
        <button type="button" onClick={previousList} className="btn btn-secondary">Previor</button>)

        if (contextState.currentList <= 3 || totleList <= 5) {
            let List = Math.min(5,totleList)
            for (let i = 1; i <= List; i++) {
                btnpushing(i);
            }
        } else if (contextState.currentList > 3 && contextState.currentList <= totleList - 3) {
            for (let i = contextState.currentList - 2; i <= contextState.currentList + 2; i++) {
                btnpushing(i);
            }
        } else if (contextState.currentList > totleList - 3) {
            for (let i = totleList - 4; i <= totleList; i++) {
                btnpushing(i);
            }
        }

        btns.push(<button type="button" onClick={nextList} className="btn btn-secondary">Next</button>,
        <button type="button" onClick={() => setCuttentList(totleList)} className="btn btn-secondary">Last</button>)

        return btns;
    }

    return (

        <>
            <div className="product_qty_instock d-flex justify-content-center">
                <p className="mb-0">Showing {startIndex+1} to {lastIndex} of {pros.display.length} entries</p>
            </div>

            <div className="btn-group" role="group" aria-label="First group">
                {btns()}
            </div>
        </>
    )
}
