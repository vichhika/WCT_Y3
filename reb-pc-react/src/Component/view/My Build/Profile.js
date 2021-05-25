import React from "react";
import "./../../../Css/profile.scss";
import './../../../Css/styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import bathImg from './../../../img/sambath.jpg';
import PersonalInfo from "./PersonalInfo";

const stylesLayoutNav_nav = {
    position: 'fixed',
    height: '100%',
    width: '300px',
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(100),
      height: theme.spacing(100),
    },
  }));

const styleLayoutSidenav_content = {
    paddingLeft: '300px',
} 


function Profile() {
    document.body.style.backgroundImage = 'none';
    const classes = useStyles();


    return (
        
        <div id="layoutSidenav" style={{marginTop: '56px'}}>
            <div id="layoutSidenav_nav" style={stylesLayoutNav_nav}>
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <br/>
                            <div className="user-profile-pic d-flex flex-column align-items-center">
                                <Avatar alt="Remy Sharp" src={bathImg} classNameName={classes.large} />
                                <br/>
                                <h6>Welcome back,</h6>
                                <h5><b>Tith Sambath</b></h5>
                            </div>
                            <div className="sb-sidenav-menu-heading">Settings</div>
                            <a className="nav-link collapsed active" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                Personal Info
                            </a>
                            <div className="sb-sidenav-menu-heading">History</div>
                            <a className="nav-link" href="charts.html">
                                Build
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content" style={styleLayoutSidenav_content}>
                <main>
                    <br/>
                    <PersonalInfo/>
                </main>
            </div>
        </div>

    );

}

export default Profile;
