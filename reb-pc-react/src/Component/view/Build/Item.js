import React, {useContext} from 'react'
import {buildContext} from "../../Context/BuildContext";

export default function Item(props) {

    const {contextState, updatContext} = useContext(buildContext)

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

    return (
        <tr className="row">
            <td className="col-3">{props.itemDetail.brand}</td>
            <td className="col-3">{props.itemDetail.model}</td>
            <td className="col-3">{props.itemDetail.price}</td>
            <td className="col-3">
                {btn}
            </td>
        </tr>
    );
}

