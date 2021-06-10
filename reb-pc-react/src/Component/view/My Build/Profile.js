import React, {useContext, useState} from "react";
import "./../../../Css/profile.scss";
import './../../../Css/styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import bathImg from './../../../img/sambath.jpg';
import PersonalInfo from "./PersonalInfo";
import UserBuild from './UserBuild';
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import server from './../../../config.json'
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

let selectedItem = <PersonalInfo/>;

function Profile() {

    let initState = {
        selectedItem: "Personal Info"
    }

    let fullname;
    let username;
    let email;
    let phoneNo;
    const [isVerify,setVerify] = useState(true);
    const [state,setState] = useState(initState);

    const {contextAuthState, updateAuthContext} = useContext(authContext);

    document.body.style.backgroundImage = 'none';
    const classes = useStyles();
    console.log(contextAuthState.userProfile);
    if(contextAuthState.isAuthenticated){
        
        // In case user account is not verify
        fullname = '...';
        username = '...';
        email = '...';
        phoneNo = '...';

        axios.get(server.uri + 'is_verify', {
            headers: {'Authorization' : 'Bearer ' + contextAuthState.token}
        }).then(
            (response) => {
                setVerify(response.data.message.localeCompare('email has been verified.') == 0 ? true : false);
                console.log(contextAuthState.userProfile);
                fullname = contextAuthState.userProfile.fullname;
                username = contextAuthState.userProfile.username;
                email = contextAuthState.userProfile.email;
                phoneNo = contextAuthState.userProfile.phone;
            }
        ).catch(error => {
            console.log(error);
        });

    }else {

        fullname = '...';
        username = '...';
        email = '...';
        phoneNo = '...';

    }

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
                                <h5><b>{username}</b></h5>
                            </div>
                            <div className="sb-sidenav-menu-heading text-muted">Settings</div>
                            <a className={`nav-link ${state.selectedItem === "Personal Info" ? "active" : "text-light"}`} href="#" 
                                data-toggle="collapse" 
                                data-target="#collapseLayouts" 
                                aria-expanded="false" 
                                aria-controls="collapseLayouts"
                                onClick={() => setState({selectedItem: "Personal Info"})}>
                                Personal Info
                            </a>
                            <div className="sb-sidenav-menu-heading text-muted">History</div>
                            <a className={`nav-link ${state.selectedItem === "Build" ? "active" : "text-light"}`} href="#"
                                onClick={() => setState({selectedItem: "Build"})}>
                                Build
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content" style={styleLayoutSidenav_content}>
                <main>
                    <br/>
                    
                    {
                        state.selectedItem === "Personal Info" ? <PersonalInfo 
                        fullname={fullname}
                        username={username}
                        email={email}
                        phoneNo={phoneNo}
                        isVerify={isVerify} /> : <UserBuild/>
                        
                    }

                </main>
            </div>
        </div>

    );

}

export default Profile;
