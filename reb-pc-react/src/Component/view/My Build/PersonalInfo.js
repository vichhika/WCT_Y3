import React, { useContext, useEffect, useState } from 'react';
import UpdateDialog from './updateDialog';
import {authContext} from './../../Context/AuthContext';
import axios from 'axios';
import server from './../../../config.json';

const cardHeaderFormate = {
    backgroundColor: 'white',
    borderBottom: 'none',
}

const PersonalInfo = (props) => {

    const initState = {
        label: '',
        value: '',
    }
    const [open, setOpenDialog] = React.useState(false);
    const [state, setState] = React.useState(initState);
    const handleClickOpen = (open) => {
        setOpenDialog(open);
    }
    let updateDialog = '';

    const handleClickUpdate = (selectedlabel, itsValue) => {

        setState({label: selectedlabel, value: itsValue});
        handleClickOpen(true);
        
    }
    
    if(state.label != ''){
        updateDialog = <UpdateDialog  open={open} handleClickOpen={handleClickOpen} label={state.label} labelValue={state.value} userInfo={props}/>;
    }

    return (
        <>
            <h2 className='text-center'>Personal info</h2>
            <div className="container-fluid d-flex justify-content-center">
                <div className="card mt-4" style={{width: '80%'}}>
                    <div class={`alert alert-warning ${props.isVerify ? 'd-none': ''}`} role="alert">
                        Your email is not verify—check it out!
                    </div>
                    <div class="card-header" style={cardHeaderFormate}>
                        <h4 className="card-title">Basic info</h4>
                        <p className="card-text">Here are some information that you have provide us since you registered.</p>
                    </div>
                    <br/>
                    <div className="card-body p-0">

                        {/*list user personal information */}
                        <div class="list-group">

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('fullname', props.fullname)}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Fullname</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.fullname}</p>
                                    </div>
                                </div>
                            </a>

                            <a href="#" class="list-group-item list-group-item-action disabled">
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>UserName</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.username}</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('email', props.email)}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Email</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.email}</p>
                                    </div>
                                </div>
                            </a>

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('phone', props.phoneNo)}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Phone No.</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.phoneNo}</p>
                                    </div>
                                </div>
                            </a>

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('password', '')}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0 text-primary'><i class="far fa-lock"></i> Change Password</p>
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        
            {updateDialog}

        </>
    );

}

export default PersonalInfo;