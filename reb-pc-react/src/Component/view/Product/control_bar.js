import React, {useContext, useEffect} from 'react'
import '../../../Css/Product_Page_Css/control-bar_css/control-bar.css'
import {ProductsContext} from './../../Context/ProductsContext';

function ControlBar(){
    
    const {productsContextState,updateProductsContext} = useContext(ProductsContext);

    const getSortAsValue = () => {
        return document.getElementById('sortSelection').value;
    }

    const selected = () => {
        return productsContextState.sortAs;
    }

    const showSortAs = () => {
        return productsContextState.sortAs == 'ASC' ? 'Price(Low -> High)' : 'Price(High -> Low)';
    }

    console.log(productsContextState.sortAs);

    return (

        // <!--Control-bar Component-->
        <div className="control-bar d-flex justify-content-between">
            <div className="displayOption d-flex align-self-center">
                <i className="fas fa-th" style={{marginLeft: '16px', marginRight: '16px'}}></i>
                <i className="far fa-bars" style={{marginRight: '16px'}}></i>
                <i className="far fa-list" style={{margiRight: '16px'}}></i>
            </div>
            <div className="sortOption">
                <div className="sortIn input-group-sm">
                    <select className="custom-select" id="sortSelection" onChange={() => updateProductsContext({type : 'setSortAs', payload: getSortAsValue()})}>
                        <option selected={selected() == 'default'} value='default'>default</option>
                        <option selected={selected() == 'ASC'} value='ASC'>Price(Low &#45;&#62; Hight)</option>
                        <option selected={selected() == 'DESC'} value='DESC'>Price(Hight &#45;&#62; Low)</option>
                    </select>
                </div>
            </div>
        </div>

    );
}

export default ControlBar;