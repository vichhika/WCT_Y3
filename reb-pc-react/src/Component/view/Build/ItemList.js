import React, { useContext } from 'react'
import { buildContext } from "./../../Context/BuildContext"
import Item from "./Item"

export default function ItemList() {
    const { contextState } = useContext(buildContext)
    const list = () => {
        let table = []
        for (let i = 0; i < contextState.listSize; i++) {
            table.push(<Item />)
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

