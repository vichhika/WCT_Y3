import React, {useContext, useEffect, useState} from 'react';
import UpdateDialog from './updateDialog';
import {authContext} from './../../Context/AuthContext';
import axios from 'axios';
import server from './../../../config.json';
import {CircularProgress, LinearProgress} from "@material-ui/core";

const cardHeaderFormate = {
    backgroundColor: 'white',
    borderBottom: 'none',
}

const PersonalInfo = (props) => {

    const initState = {
        label: '',
        value: '',
    }
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    const [open, setOpenDialog] = React.useState(false);
    const [state, setState] = React.useState(initState);
    const [emailSend, setEmailSend] = useState(false);
    const [resendDone, setResendDone] = useState(false);
    const [resendError, setResendError] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const handleClickOpen = (open) => {
        setOpenDialog(open);
    }
    let updateDialog = '';

    const handleClickUpdate = (selectedlabel, itsValue) => {

        setState({label: selectedlabel, value: itsValue});
        handleClickOpen(true);

    }

    if (state.label != '') {
        updateDialog =
            <UpdateDialog open={open} handleClickOpen={handleClickOpen} label={state.label} labelValue={state.value}
                          userInfo={props}/>;
    }

    const checkEmail = () => {
        setLoadingVerify(true)
        axios.get(server.uri + "is_verify", {headers: {'Authorization': `Bearer ${contextAuthState.token}`}})
            .then(r => {
                console.log(r.data)
                if (r.data.statusCode === 1) {
                    updateAuthContext({type: 'setIsVerify', payload: true})
                } else {
                    updateAuthContext({type: 'setIsVerify', payload: false})
                    setEmailSend(true)
                    setTimeout(function () {
                        setEmailSend(false)
                    }, 5000);
                }
                setLoadingVerify(false)
            }).catch(e => {
            setLoadingVerify(false)
            console.log(e)
        })
    }

    const resendEmail = () => {
        setLoadingResend(true)
        axios.get(server.uri + "resend_email_verification", {headers: {'Authorization': `Bearer ${contextAuthState.token}`}})
            .then(r => {
                console.log(r.data.message)
                if (r.data.message.localeCompare("send verify again") === 0) {
                    setResendDone(true)
                    setTimeout(function () {
                        setResendDone(false)
                    }, 5000);
                } else {
                    setResendError(true)
                    setTimeout(function () {
                        setResendError(false)
                    }, 5000);
                }
                setLoadingResend(false)
            }).catch(e => {
            setLoadingResend(false)
            console.log(e)
        })
    }


    return (
        <>
            <h2 className='text-center'>Personal info</h2>
            <div className="container-fluid d-flex justify-content-center">
                <div className="card mt-4" style={{width: '80%'}}>
                    {contextAuthState.isVerify || <>
                        {loadingVerify || loadingResend && <LinearProgress/>}
                        <div className={`d-flex justify-content-between align-items-center alert alert-warning`}
                             role="alert">
                            <p className={"m-0"}>Your email is not verify—check it out!</p>
                            {loadingVerify || loadingResend || <div>
                                <button onClick={checkEmail} className="btn btn-secondary mr-3">Check
                                    verity
                                </button>
                                <button onClick={resendEmail} className="btn btn-primary">Resend verity
                                    email
                                </button>
                            </div>}

                        </div>
                    </>
                    }

                    <div class="card-header" style={cardHeaderFormate}>
                        <h4 className="card-title">Basic info</h4>
                        <p className="card-text">Here are some information that you have provide us since you
                            registered.</p>
                    </div>
                    <br/>
                    <div className="card-body p-0">

                        {/*list user personal information */}
                        <div class="list-group">

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal"
                               data-target="#UpdateModalCenter"
                               onClick={() => handleClickUpdate('fullname', props.fullname)}>
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
                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal"
                               data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('email', props.email)}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Email</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.email}</p>
                                    </div>
                                </div>
                            </a>

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal"
                               data-target="#UpdateModalCenter"
                               onClick={() => handleClickUpdate('phone', props.phoneNo)}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Phone No.</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>{props.phoneNo}</p>
                                    </div>
                                </div>
                            </a>

                            <a href="#" class="list-group-item list-group-item-action" data-toggle="modal"
                               data-target="#UpdateModalCenter" onClick={() => handleClickUpdate('password', '')}>
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

            {emailSend &&
            <div className={`w-75 mx-auto alert my-3 alert-danger alert-dismissible fade show`} role="alert">
                <p>Your account haven't verify</p>
                <button type="button" onClick={() => setEmailSend(false)} className="close" data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}

            {resendError &&
            <div className={`w-75 mx-auto alert my-3 alert-danger alert-dismissible fade show`} role="alert">
                <p>Error send email verify please try again</p>
                <button type="button" onClick={() => setResendError(false)} className="close" data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}


            {resendDone &&
            <div className={`w-75 mx-auto alert my-3 alert-success alert-dismissible fade show`} role="alert">
                <p>we send email verify already check your email inbox</p>
                <button type="button" onClick={() => setResendDone(false)} className="close" data-dismiss="alert"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}

        </>
    );

}

export default PersonalInfo;