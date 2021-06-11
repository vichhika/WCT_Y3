import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import server from './../../config.json';
import { AuthContext } from "../Context/AuthContext";
import { UpdateDialog } from './UpdateDialog';

const initProfile = {
    label: '',
    value: '',
}

const Profile = () => {

    const {authContextState, authUpdateContextState} = useContext(AuthContext);
    const [updateLabel, setUpdateLabel] = useState(initProfile);
    let view = "...";
    let updateDialog;

    const handleClickUpdate = (label, value) => {

        const updateLabel = {
            label: label,
            value: value
        }
        setUpdateLabel(updateLabel);

    }

    useEffect( () => {
        /* check if email verify then request profile */
        if(authContextState.isVerify){
            if(authContextState.admin_shop_profile == null){
                const config = {
                    headers: {'Authorization' : 'Bearer ' + `${authContextState.authentication.token}`}
                }
                axios.get(server.uri + 'admin_shop/profile_info', config)
                .then(
                    response => {
                        if(response.data.statusCode == 1){
                            console.log(response.data.message[0]);
                            authUpdateContextState({type: 'set_admin_shop_profile', payload: response.data.message[0]});
                        }
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
            }
        }else {
            view = '...';
        }
        /* End request profile */

    });

    // in case the profile already exist
    if(authContextState.isVerify){
        if(authContextState.admin_shop_profile != null){
            view = Object.keys(authContextState.admin_shop_profile).map((key,index) => {
                            if(key.localeCompare('adminshopID') == 0 || key.localeCompare('profile') == 0){
                                return;
                            }
                            return <a key={key} href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#updateDialogModalCenter" onClick={() => handleClickUpdate(key,authContextState.admin_shop_profile[key])}>
                                    <div className="row">
                                        <div className="col-3">
                                            <p className="mb-0 text-muted">{key}</p>
                                        </div>
                                        <div className="col">
                                            <p className="mb-0 text-info">{authContextState.admin_shop_profile[key]}</p>
                                        </div>
                                    </div>
                                </a>
                        })
        }
        console.log(authContextState.admin_shop_profile.email);
    }//end in case the profile already exist

    if(updateLabel.label != ''){
        updateDialog = <UpdateDialog label={updateLabel.label} value={updateLabel.value}/>;
    }

    return (
        <>
            <div>
                <h2>Admin Profile</h2>
            </div>
            <div className="card p-0">
                <div className="card-header">
                    <h4 className="card-title">Basic info</h4>
                    <p className="card-text">Here are some information that you have provide us since you registered.</p>
                </div>
                <div className="card-body">
                    <div class="list-group">
                        {view}
                        <a key="password" href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#updateDialogModalCenter" onClick={() => handleClickUpdate('password','')}>
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 text-primary"><i class="far fa-lock-alt"/> Change Password</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            {updateDialog}
        </>
        
    );

}

export {
    Profile
}