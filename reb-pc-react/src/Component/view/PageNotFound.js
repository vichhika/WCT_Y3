import React from "react";
import "./../../Css/pageNotFound.css"
import {Link} from "react-router-dom";

function PageNotfound(){


    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>:(</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable.</p>
                <Link to="/">Go to homepage</Link>
            </div>
        </div>
    );
}

export default PageNotfound;