import React, { useContext } from 'react'
import { buildContext } from "./../../Context/BuildContext"

export default function ListSize() {
    const { contextState, updatContext } = useContext(buildContext)
    const setlistSize = (size) => {
        updatContext({
            type: 'set_listSize',
            payload: size
        })
    }
    return (
        <div class="dropList">
            <button type="button" class="dropListBtn btn btn-light">
                {contextState.listSize}<i class="fal fa-caret-down"></i>
            </button>
            <div class="dropList-menu">
                <a onClick={() => {setlistSize(5)}} class="dropdown-item" href="#">5</a>
                <a onClick={() => {setlistSize(10)}} class="dropdown-item" href="#">10</a>
                <a onClick={() => {setlistSize(15)}} class="dropdown-item" href="#">15</a>
            </div>
        </div>
    )
}