import React from "react";
import {Link} from 'react-router-dom'
import './../../Css/navbar.scss'
function Navbar() {


  return (
    <nav className="myNav navbar navbar-expand-lg text-light fixed-top">
        <Link className="navbar-brand" to="/">REAB PC</Link>
        <ul className="nav collapse">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">Product</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/aboutUs">About Us</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link active" to="/donate">Donate</Link>
            </li>
        </ul>  
    </nav>
  );
}

export default Navbar;