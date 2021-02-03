import React from "react";
import './../../Css/tamplet.css'

function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg fixed-top">
        <a className="navbar-brand text-light" href="home.html">REAB PC</a>
        <ul className="nav collapse">
            <li className="nav-item">
              <a className="nav-link active text-light" href="home.html">Home <span className="sr-only">(current)</span></a>
            </li>

            <li className="nav-item">
              <a className="nav-link text-light" href="#">Product</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active text-light" href="./../html/aboutUs.html">About Us</a>
            </li>

            <li className="nav-item">
                <a className="nav-link active text-light" href="./../html/donate.html">Donate</a>
            </li>
        </ul>  
    </nav>
  );
}

export default Navbar;