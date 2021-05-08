import React, {useContext, useEffect} from 'react'
import {buildContext} from "./../../Context/BuildContext"
import Item from "./Item"
import useData from './../../userData.js'

export default function ItemList(props) {
    const {contextState} = useContext(buildContext)

    let lastIndex = Math.min(contextState.currentList * 10, contextState.componentPayload.length);
    let startIndex = contextState.currentList * 10 - 10;

    console.log(startIndex,contextState.componentPayload.length);
    console.log(lastIndex,contextState.componentPayload.length);

    const list = () => {
        let table = []
        if (contextState.selectedComponent[contextState.component] === null) {
            for (let i = startIndex; i < lastIndex; i++) {
                table.push(<Item itemDetail={contextState.componentPayload[i]}/>)
            }
        } else {
            table.push(<Item itemDetail={contextState.selectedComponent[contextState.component]}/>)
        }
        return table;
    }

    return (

        <table class="table">
            <thead>
            <tr className="row">
                <th className="col-3">Name</th>
                <th className="col-3">Model</th>
                <th className="col-3">Price</th>
                <th className="col-2">Select</th>
                <th className="col-1"></th>
            </tr>
            </thead>
            <tbody>
            {list()}
            </tbody>

        </table>

    );
}

