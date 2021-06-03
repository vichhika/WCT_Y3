import React, {useState} from "react";
import {Link} from 'react-router-dom'
import '../../../Css/Home-panel/transparent-layer/transparent-layer.css'
import useScrollPosition from '@react-hook/window-scroll'

function TransparentLayer(){

    return(
        <div className="transparent-layer jumbotron jumbotron-fluid d-flex">
            <div className="container-fluid greeting">
                <h1 className="display-4 text-light"><b>Welcome !</b></h1>
                <p style={{color: '#ccc'}}>
                    Reab PC is a platform that provide a user more easier to build 
                    PC,<br/>estimate price, and PC shop recommandation.
                </p>
                <Link to="/Build">
                    <button id="startBtn" type="button" className="btn btn-sm my-2 px-4 py-2 text-light" style={{borderRadius: '25px', backgroundColor: '#0088A9'}}>
                        Start Build
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default TransparentLayer;
