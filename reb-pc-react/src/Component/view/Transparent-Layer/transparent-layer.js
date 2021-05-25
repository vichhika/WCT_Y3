import React from "react";
import {Link} from 'react-router-dom'
import '../../../Css/Home-panel/transparent-layer/transparent-layer.css'

function TransparentLayer(){
    return(
        <div className="transparent-layer jumbotron jumbotron-fluid d-flex mt-5">
            <div className="container-fluid">
                <h1 className="display-4 text-light">Welcome !</h1>
                <p className="text-light">
                    Reab PC is a platform that provide a user more easier to build 
                    PC,<br/>estimate price, and PC shop recommandation.
                </p>
                <Link to="/Build">
                    <button id="startBtn" type="button" className="btn btn-primary btn-sm my-2 px-4 py-2" style={{borderRadius: '25px'}}>
                        Start Build
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default TransparentLayer;
