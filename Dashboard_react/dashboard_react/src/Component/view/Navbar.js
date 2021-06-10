import React from "react";
import App from "../../App";

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <a className="navbar-brand" href="javascript:;">Dashboard</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
                        aria-expanded="false" aria-label="Toggle navigation" data-target=".navbar-collapse.justify-content-end">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"/>
                    <span className="navbar-toggler-icon icon-bar"/>
                    <span className="navbar-toggler-icon icon-bar"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="javascript:;" id="navbarDropdownProfile"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">person</i>
                                <p className="d-lg-none d-md-block">
                                    Account
                                </p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                                <a className="dropdown-item" href="#">Profile</a>
                                <a className="dropdown-item" href="#">Settings</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Log out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

