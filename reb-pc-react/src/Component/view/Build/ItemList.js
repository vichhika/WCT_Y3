import React, { useContext, useEffect } from 'react'
import { buildContext } from "./../../Context/BuildContext"
import Item from "./Item"
import useData from './../../userData.js'

export default function ItemList(props) {
    const { contextState } = useContext(buildContext)
    
    const list = () => {
        let table = []
        for (let i = 0; i < contextState.listSize; i++) {
            table.push(<Item itemDetail={contextState.componentPayload[i]} />)
        }
        return table;
    }

    return (

        <table class="table table-hover mt-5">
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Model</th>
                <th>Price</th>
                <th></th>
            </tr>
            {list()}
        </table>

    );
}

