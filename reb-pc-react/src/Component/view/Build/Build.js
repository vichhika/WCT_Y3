import React, {useContext} from "react";
import "./../../../Css/build.scss";
import ProductList from "./ProductList";
import ProcessBar from "./ProcessBar";
import {buildContext} from "../../Context/BuildContext";

function Build() {
    const {contextState} = useContext(buildContext)

    document.body.style.backgroundImage = 'none';

    let processBar;
    if (!contextState.isBuildDone) {
        processBar = <ProcessBar/>
    }

    return (
        <div className="p-Build">
            <div class="container w-75 d-flex justify-content-center text-center">
                <h2 class="card-title mt-5">Build Custom PC</h2>
                <p class="card-text mt-3">
                    Complete all the step below to successful build your own PC.
                </p>

                {processBar}

                <ProductList/>
            </div>
        </div>
    );
}

export default Build;
