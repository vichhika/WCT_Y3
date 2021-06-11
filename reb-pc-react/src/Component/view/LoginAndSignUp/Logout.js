import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import bathImg from './../../../img/sambath.jpg';
import axios from "axios";
import server from './../../../config.json';
import {authContext} from "../../Context/AuthContext";
import { useHistory } from 'react-router';
const Logout = () =>  {

    let history = useHistory();

    const {contextAuthState, updateAuthContext} = useContext(authContext);

    const handleLogout = () => {
        axios.get(server.uri + 'logout',{
            headers: {
                'Authorization': `Bearer ${contextAuthState.token}`
            }
        }).then((response) => {

            updateAuthContext({type: 'setUserProfile', payload: null});
            // update auth state
            updateAuthContext({type: 'set_isAuthenticated', payload: false});
            updateAuthContext({type: 'setIsVerify', payload: false});
            // redirect to the home page
            history.replace('/');


        }).catch((error) => {

            console.log(error)

        });
    }

    return (
        <>
            <Avatar src={bathImg} id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" arial-expanded="false">B</Avatar>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{minWidth: '120px'}}>
                <a class="dropdown-item text-danger" 
                    type="submit"
                    href="#"
                    onClick={() => handleLogout()}
                    >
                    Logout &nbsp;
                    <i class="far fa-sign-out"></i>
                </a>
            </div>
        </>

    );

}

export default Logout;