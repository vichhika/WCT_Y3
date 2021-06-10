import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import axios from 'axios';
import server from './../../../config.json';
import { authContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";

const UpdateDialog = (props) => {

    const open = props.open;
    const handleOpen = props.handleClickOpen;
    let updateLabel = props.label ?? 'name';
    let labelValue = props.labelValue;
    const {contextAuthState, updateAuthContext} = useContext(authContext);
    // mean data that attemp to update to has been used.
    const [isUsed,setIsUsed] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [isOldPass, setIsOldPass] = useState(false);
    const [confirmPassMatch, setConfirmPassMatch] = useState(true);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {saveUpdate(data)};

    // console.log(props.userInfo.phoneNo);
    let inputType = 'text'
    let form_update;

    if (updateLabel === 'email'){
        inputType = 'email';
    }else if (updateLabel === 'username'){
        inputType = 'text';
    }else if (updateLabel === 'password'){
        console.log("Here");
        inputType = 'password';
        form_update = <div class="form-group">
                        <label for="currentPass">Current Password*</label>
                        <input key={"current_password"} {...register("current_password", { required: true })} type={inputType} class="form-control" id="currentPass" aria-describedby="currentPassword" onChange={() => setWrongPassword(false)} minlength="8" required/>
                        <small id="alertCurrentPass" class={`form-text text-danger ${wrongPassword ? '' : 'd-none'}`}>Wrong Password!</small>

                        <label for="newPassword">{updateLabel + '*'}</label>
                        <input key={"new_password"} {...register("new_password", { required: true })} type={inputType} class="form-control" id="newPassword" aria-describedby="updatePassword" onChange={() => setIsOldPass(false)} minlength="8" required/>
                        <small id="alertNewPass" class={`form-text text-danger ${isOldPass ? '' : 'd-none'}`}>Can't use old password</small>
                        
                        <label for="confirmUpdate">{'Confirm password' + '*'}</label>
                        <input key={"confirm_password"} {...register("confirm_password", { required: true })} type={inputType} class="form-control" id="confirmUpdate" aria-describedby="confirmUpdate" onChange={() => setConfirmPassMatch(true)} minlength="8" required/>
                        <small id="alertConfirmPass" class={`form-text text-danger ${confirmPassMatch ? 'd-none' : ''}`}>confirm password is not match !</small>
                    </div>;

    }

    if(updateLabel != '' && updateLabel != 'password'){
        if(updateLabel.localeCompare('phone') == 0){

            form_update = <div class="form-group">
                        <label for="updateInput">{updateLabel + '*'}</label>
                        <input key={updateLabel} {...register(updateLabel, { required: true})} key={updateLabel} type={inputType} className="form-control" id="updateInput" aria-describedby="updateHelp" defaultValue ={labelValue} minLength='8' pattern='^0[0-9]{8,9}$' title="Input must follow pattern: ^0[0-9]{8,9}$" required/>
                        <small id="alert" className={`form-text text-danger ${isUsed ? '' : 'd-none'}`}>This {updateLabel} is already used !</small>
                    </div>;

        }else {

            form_update = <div class="form-group">
                        <label for="updateInput">{updateLabel + '*'}</label>
                        <input key={updateLabel} {...register(updateLabel, { required: true})} key={updateLabel} type={inputType} className="form-control" id="updateInput" aria-describedby="updateHelp" defaultValue ={labelValue} minLength='3' required/>
                        <small id="alert" className={`form-text text-danger ${isUsed ? '' : 'd-none'}`}>This {updateLabel} is already used !</small>
                    </div>;

        }
    }

    const onCloseModal = () => {
        // reset state
        setIsOldPass(false);
        setConfirmPassMatch(true);
        setIsUsed(false);
    }

    const closeModal = () => {
        document.getElementById('closeBtn').click();
    }

    const requestUpdateUserInfo = (data) =>{

        const dataset = {
            'fullname': updateLabel == 'fullname' ? data.fullname : props.userInfo.fullname,
            'phone': updateLabel == 'phone' ? data.phone : props.userInfo.phoneNo,
            'email': updateLabel == 'email' ? data.email : props.userInfo.email,
        }

        const config = {
            headers: {
                'Authorization': `Bearer ` + `${contextAuthState.token}`
            } 
        }

        axios.post(server.uri + 'profile_update', dataset, config)
        .then(
            (response) => {
                if(response.data.statusCode != 0){
                    let updateUserInfo = {
                        id: contextAuthState.userProfile.id,
                        fullname: dataset.fullname, 
                        username: contextAuthState.userProfile.username,
                        phone: dataset.phone,
                        email: dataset.email
                    }
                    if(response.status == 200){
                        updateAuthContext({type: 'setUserProfile', payload: updateUserInfo});
                        // switch(updateLabel){
                        //     case 'fullname' : labelValue = updateUserInfo.fullname;break;
                        //     case 'phone'    : labelValue = updateUserInfo.phone;break;
                        //     case 'email'    : labelValue = updateUserInfo.email;break;
                        // }
                    }
                    setIsUsed(false);
                    // close modal
                    closeModal();
                    console.log("close");
                }else {
                    setIsUsed(true);
                }
            }
        ).catch(
            (error) => {
                console.log(error);
                alert("Your email address is not verified.");
            }
        )
    }

    const requestChangePassword = (data) => {
        
        const dataset = {
            'current_password': data.current_password,
            'new_password': data.new_password,
            'new_password_confirmation': data.confirm_password,
        }

        const config = {
            headers: {
                'Authorization': `Bearer ` + `${contextAuthState.token}`
            } 
        }

        axios.post(server.uri + 'change_password', dataset, config)
        .then(
            (response) => {
                if(response.data.statusCode == 1){
                    // change password success then close modal
                    closeModal();
                }

                // // otherwise it will print error
                if(response.data.message.localeCompare('current password is not correct.') == 0){
                    setWrongPassword(true);
                }
                

            }
        ).catch( 
            (error) => {
                console.log(error);
                alert("Error : " ,error.response.message);
            }
        );
    }

    const saveUpdate = (data) => {

        if(updateLabel.localeCompare('password') != 0){
            requestUpdateUserInfo(data);
        }else {
            let validate = true;
            // validate before request
                // check if new pass is the same as current pass
                if(data.current_password.localeCompare(data.new_password) == 0){
                    setIsOldPass(true);
                    validate = false;
                }
                // check confirm password
                if(data.new_password.localeCompare(data.confirm_password) != 0){
                    setConfirmPassMatch(false);
                    validate = false;
                }
                console.log(validate);
                if(validate){
                    requestChangePassword(data);
                }
        }

    }

    return (
        
        <>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="UpdateModalCenter" tabindex="-1" role="dialog" aria-labelledby="UpdateModalCenter" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLongTitle">{updateLabel}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            {/* <span aria-hidden="true">&times;</span> */}
                            </button>
                        </div>
                        <div class="modal-body">
                            To update {updateLabel.toLowerCase()} in this website, please update the {updateLabel.toLowerCase()} below. We will send updates
                            request to our server.
                            <hr/>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {form_update}
                                <div class="modal-footer">
                                    <button id='closeBtn' type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => onCloseModal()}>Close</button>
                                    <button type="submit" class="btn btn-primary" id="saveBtn">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default UpdateDialog;