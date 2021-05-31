import React ,{useContext}from "react";
import {Link} from 'react-router-dom'
import '../../../Css/navigation_bar/navigation-bar-style.css';
import '../../../Css/navigation_bar/menu/menu.css';
import '../../../Css/navigation_bar/sm-screen-view/sm-screen-view.css';
import '../../../Css/navigation_bar/md-lg-screen-view/md-lg-screen-view.css';
import '../../../Css/navigation_bar/menu/entry.css';
import '../../../Css/navigation_bar/user-profile-btn/user-profile-btn.css';
import { authContext } from "../../Context/AuthContext";
import Logout from './../LoginAndSignUp/Logout';
import useScrollPosition from '@react-hook/window-scroll'
import { useHistory } from 'react-router';

function Navbar(props) {

    let history = useHistory();
    const scrollY = useScrollPosition(60 /*fps*/);

    let colorNavbar = '';
    
    let location = history.location.pathname;

    if(location == '/'){
        colorNavbar = scrollY > 0 ? '#161b21' : '';
    }else {
        colorNavbar = '#161b21';
    }

    const {contextAuthState} = useContext(authContext);

    const displayEntry = contextAuthState.isAuthenticated ? 'none' : 'list-item';
    const displayUserProfile = !contextAuthState.isAuthenticated ? 'inline-block' : 'none';
    const displayUserBuildPage = !contextAuthState.isAuthenticated ? 'none' : 'list-item';

    function click(){
        let menu = document.getElementById("mnu").style.display;
        if (menu === 0 || menu ==='none')
            document.getElementById("mnu").style.display = 'block';
        else if (menu === 'block')
            document.getElementById("mnu").style.display = 'none';
    }

    const styleNavItem = {
        textDecoration: 'none',

    }

    return (

    // <!--Navigation bar component-->
        <nav className="navigation-bar navbar navbar-expand-lg fixed-top" style={{backgroundColor: colorNavbar}}>

            {/* <!--sm Screen view--> */}
            <div className="sm-screen-view">
                {/* <!--navigation-bar-sm-width--> */}
                <div className="sm-nav-property d-flex" style={{justifyContent: 'space-between', width: '100%'}}>
                        
                    {/* <!--menulist button--> */}
                    <button type="button" className="btn btn-dark btn-sm" style={{backgroundColor: 'rgba(0, 0, 0, 1)', alignSelf: 'center', border:'none'}} onClick={click}>
                        <i id="dpd-menu-btn-id" className="menu-btn far fa-bars" style={{color: 'white', verticalAlign: 'middle'}}/>
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
                        <Link to="/login">Login</Link>
                        {/* <a href="#">Log in</a> */}
                    </li>
                    <li className="entry sign-up-btn" style={{display: displayEntry}}>
                        <Link to="/signUp">Sign Up</Link>
                        {/* <a href="#">Sign up</a> */}
                    </li>
                </ul>

            </div>

            {/* <!--md-lg Screen view--> */}
            <div className="md-lg-screen-view">

                {/* <a className="navbar-brand text-light"
                    href="#"
                    style={{margin: 0}}>Reab PC</a> */}
                <Link className="navbar-brand" to="/" style={{margin: 0, color: '#f3aa4e'}}><i class="fal fa-desktop"></i> &nbsp;REABPC</Link>
                
                <ul className="menu">
                    <li>
                        <Link className={location == '/' ? '.mactive' : 'text-white-50'} to="/" style={styleNavItem}>Home</Link>
                    </li>
                    <li>
                        <Link className={location == '/build' ? '.mactive' : 'text-white-50'} to="/build" style={styleNavItem}>Build</Link>
                    </li>
                    <li>
                        <Link className={location == '/product_page' ? '.mactive' : 'text-white-50'} to="/product_page" style={styleNavItem}>Product</Link>
                    </li>

                    <li style={{display: `${contextAuthState.isAuthenticated ? "list-item" : "none"}`}}>
                        <Link className={location == '/profile' ? '.mactive' : 'text-white-50'} to="/profile" style={styleNavItem}>Profile</Link>
                    </li>

                    {/* <!--Declare entry to make it easy to select and disable--> */}


                    <li className="entry log-in-btn" style={{display: displayEntry}}>
                        <Link to="/login" style={styleNavItem}>Login</Link>
                    </li>

                    <li className="entry sign-up-btn" style={{display: displayEntry}}>
                        <button className="btn btn-sm">
                            <Link className="text-light" to="/signUp" style={styleNavItem}><b>Sign Up</b></Link>
                        </button>
                    </li>

                    {/* <!--Display this user-profile only acc exist--> */}
                    <li className="acc-exist" style={{position: 'relative', display: `${contextAuthState.isAuthenticated ? "list-item" : "none"}`}}>
                        {/* <button className="user-profile-btn btn btn-primary btn-sm">B</button> */}
                        <Logout/>
                    </li>
                </ul>
            </div>
            
        </nav>

    );
}

export default Navbar;