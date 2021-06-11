import React, { useContext } from 'react'
import { buildContext } from "../../Context/BuildContext";

export default function Item(props) {

    const { contextState, updatContext } = useContext(buildContext)

    const pushToSelectedStore = componnet => {
        const store = contextState.selectedComponent
        store[contextState.component] = componnet
        updatContext({
            type: 'set_SelectedComponent',
            payload: store
        })
    }

    const popOutSelectedStore = () => {
        const store = contextState.selectedComponent
        store[contextState.component] = null
        updatContext({
            type: 'set_SelectedComponent',
            payload: store
        })
    }

    let btn;
    if (contextState.selectedComponent[contextState.component] === null) {
        btn =
            <button onClick={() => pushToSelectedStore(props.itemDetail)} type="button" className="btn btn-primary">
                Add
            </button>
    } else {
        btn =
            <button onClick={popOutSelectedStore} type="button" className="btn btn-danger">
                Delete
            </button>
    }



    const itemDetail = () => {
        let detail = []
        for (let [key, value] of Object.entries(props.itemDetail)) {
            if (key.toLowerCase().includes("id") || key.toLowerCase().includes("at")) continue
            detail.push(<p><span><span
                className="font-weight-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>: {value} </span></p>)
        }
        return detail
    }


    const itemID = "collapse" + props.index 
    const itemIDQ = "#" + itemID
    return (
        <tr className="row">
            <td className="col-3 ">{props.itemDetail.brand}</td>
            <td className="col-3 ">{props.itemDetail.model}</td>
            <td className="col-3 ">{props.itemDetail.price}$</td>
            <td className="col-2">
                {btn}
            </td>
            <td className="col-1">
                <button className="btn mx-4" data-toggle="collapse" data-target={itemIDQ} aria-expanded="true"
                    aria-controls={itemID}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg>
                </button>
            </td>
            <div id={itemID} className="collapse col-12" aria-labelledby="headingOne" data-parent="#accordion">
                <div className=" d-flex justify-content-around">
                    {itemDetail()}
                </div>
            </div>
        </tr>
    );
}

