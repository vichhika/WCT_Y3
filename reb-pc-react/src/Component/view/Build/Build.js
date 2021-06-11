import React, { useContext } from "react";
import "./../../../Css/build.scss";
import ProductList from "./ProductList";
import ProcessBar from "./ProcessBar";
import { buildContext } from "../../Context/BuildContext";
import ShopCollection from './ShopCollection';
import { ShopsContext } from './../../Context/ShopsContext';

function Build() {
    const { contextState, updatContext } = useContext(buildContext)
    const { shopsContext, updateShopsContext } = useContext(ShopsContext);
    document.body.style.backgroundImage = 'none';

    let processBar;
    if (!contextState.isBuildDone) {
        processBar = <ProcessBar />
    }

    let buildStep;

    const changeShop = () => {
        sessionStorage.removeItem("buildSave")
        updatContext({
            type: 'init_context'
        })
        updateShopsContext({
            type: 'reset_context',
            payload: {
                loading: true,
                shops: null,
                shopName: null,
                selectedShop: null,
            }
        })
    }


    if (shopsContext.selectedShop == null) {
        console.log(shopsContext.selectedShop);
        buildStep = <ShopCollection contextState={contextState} updateContext={updatContext} />
    } else {
        console.log(shopsContext);
        buildStep = <div class="container w-75 d-flex justify-content-center text-center">
            <h2 class="card-title mt-5">Build Custom PC at {shopsContext.shopName}</h2>
            <p class="card-text mt-3">
                Complete all the step below to successful build your own PC.
            </p>

            {processBar}

            <ProductList />
            <button className="btn btn-danger" onClick={changeShop}>Change Shop</button>
        </div>;
    }

    return (
        <div className="p-Build" style={{ width: '100%', height: '100%' }}>

            {buildStep}

        </div>
    );
}

export default Build;
