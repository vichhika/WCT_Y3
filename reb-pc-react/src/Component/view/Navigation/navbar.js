import React ,{useContext}from "react";
import {Link} from 'react-router-dom'
import '../../../Css/navigation_bar/navigation-bar-style.css';
import '../../../Css/navigation_bar/menu/menu.css';
import '../../../Css/navigation_bar/sm-screen-view/sm-screen-view.css';
import '../../../Css/navigation_bar/md-lg-screen-view/md-lg-screen-view.css';
import '../../../Css/navigation_bar/menu/entry.css';
import '../../../Css/navigation_bar/user-profile-btn/user-profile-btn.css';
import { authContext } from "../../Context/AuthContext";

function Navbar(props) {

    const {contextAuthState} = useContext(authContext);

    console.log("navbar ",contextAuthState)

    const displayEntry = contextAuthState.isAuthenticated ? 'none' : 'list-item';
    const displayUserProfile = !contextAuthState.isAuthenticated ? 'none' : 'inline-block';
    const displayUserBuildPage = !contextAuthState.isAuthenticated ? 'none' : 'list-item';

    function click(){
        let menu = document.getElementById("mnu").style.display;
        if (menu == 0 || menu ==='none')
            document.getElementById("mnu").style.display = 'block';
        else if (menu === 'block')
            document.getElementById("mnu").style.display = 'none';
    }

    const styleNavItem = {
        textDecoration: 'none',
    }

    return (

    // <!--Navigation bar component-->
        <nav className="navigation-bar navbar navbar-expand-lg fixed-top">

            {/* <!--sm Screen view--> */}
            <div className="sm-screen-view">
                {/* <!--navigation-bar-sm-width--> */}
                <div className="sm-nav-property d-flex" style={{justifyContent: 'space-between', width: '100%'}}>
                        
                    {/* <!--menulist button--> */}
                    <button type="button" className="btn btn-dark btn-sm" style={{backgroundColor: 'rgba(0, 0, 0, 1)', alignSelf: 'center', border:'none'}} onClick={click}>
                        <i id="dpd-menu-btn-id" className="menu-btn far fa-bars" style={{color: 'white', verticalAlign:'middle'}}></i>
                    </button>
                    
                    {/* <!--Website Title Component--> */}
                    {/* <a className="navbar-brand text-light"
                        href="#"
                        style={{margin: 0}}>Reab PC</a> */}
                    <Link className="navbar-brand text-light" style={{margin: 0}}>Reab PC</Link>
                    
                    
                    {/* <!--user-profile-component-->
                    <!--visible only acc exist--> */}
                    <button className="user-profile-btn btn btn-primary btn-sm" style={{visibility:'hidden'}}>B</button>

                </div>

                {/* <!--menu-component (dropdown)--> */}
                <ul id="mnu" className="menu">
                    <li>
                        {/* <a className="text-light" href="#">Home</a> */}
                        <Link className="text-light" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="text-light" to="/Build">Build</Link>
                        {/* <a className="text-light" href="#">Build</a> */}
                    </li>
                    <li>
                        <Link className="text-light" to="/Product">Product</Link>
                        {/* <a className="text-light" href="#">Product</a> */}
                    </li>
                    <li>
                        <Link className="text-light" to="/Donate">Donate</Link>
                        {/* <a className="text-light" href="#">Donate</a> */}
                    </li>




                    {/* <!--Declare entry to make it easy to select and disable--> */}
                    <li className="entry log-in-btn" style={{display: displayEntry}}>
                        <Link to="/Login">Login</Link>
                        {/* <a href="#">Log in</a> */}
                    </li>
                    <li className="entry sign-up-btn" style={{display: displayEntry}}>
                        <Link to="/SignUp">Sign Up</Link>
                        {/* <a href="#">Sign up</a> */}
                    </li>
                </ul>

            </div>

            {/* <!--md-lg Screen view--> */}
            <div className="md-lg-screen-view">

                {/* <a className="navbar-brand text-light"
                    href="#"
                    style={{margin: 0}}>Reab PC</a> */}
                <Link className="navbar-brand text-light" to="/" style={{margin: 0, fontWeight: 'bold'}}>Reab PC</Link>
                
                <ul className="menu">
                    <li>
                        <Link className="text-light" to="/" style={styleNavItem}>Home</Link>
                    </li>
                    <li>
                        <Link className="text-light" to="/Build" style={styleNavItem}>Build</Link>
                    </li>
                    <li>
                        <Link className="text-light" to="/product_page" style={styleNavItem}>Product</Link>
                    </li>
                    <li>
                        <Link className="text-light" to="/Donate" style={styleNavItem}>Donate</Link>
                    </li>

                    <li>
                        <Link className="text-light" to="/profile" style={styleNavItem}>Profile</Link>
                        {/* <a className="text-light" href="#">Donate</a> */}
                    </li>

                    {/* <!--Declare entry to make it easy to select and disable--> */}


                    <li className="entry log-in-btn" style={{display: displayEntry}}>
                        <Link to="/Login" style={styleNavItem}>Login</Link>
                    </li>
                    <li className="entry sign-up-btn" style={{display: displayEntry}}>
                        <Link to="/SignUp" style={styleNavItem}>Sign Up</Link>
                    </li>
                    
                    {/* User Build */}

                    <li style={{display: displayUserBuildPage}}>
                        <Link  className="text-light" to="#" style={styleNavItem}>My Build</Link>
                    </li>

                    {/* <!--Display this user-profile only acc exist--> */}
                    <li className="acc-exist" style={{display: displayUserProfile}}>
                        <button className="user-profile-btn btn btn-primary btn-sm">B</button>
                    </li>
                </ul>
            </div>
            
        </nav>

    );
}

export default Navbar;