import axios from 'axios';
import React, {useContext, useState} from 'react'
import { useForm } from 'react-hook-form';
import server from './../../config.json'
import { AuthContext } from "../Context/AuthContext";
const UpdateDialog = (props) => {

    let label = props.label;
    let value = props.value;
    let formUpdate;
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {authContextState, authUpdateContextState} = useContext(AuthContext);
    const [onSubmiting, setOnSubmiting] = useState(false);
    const [isOldPass, setIsOldPass] = useState(false);
    const [confirmNotMatch, setConfirmNotMatch] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    let inputType = 'text';
    const closeModal = () => {
        document.getElementById('closeBtn').click();
    }

    const onSubmit = (data) => {
        // submit update only if email is verify
        if(authContextState.isVerify){
            
            if(label.localeCompare('password') !== 0){

                requestUpdateInfo(data);

            }else {
                let validated = true;
                if(data.password.localeCompare(data.new_password) === 0){
                    validated = false;
                    setIsOldPass(true);
                }else if(data.new_password.localeCompare(data.confirm_password) !== 0){
                    validated = false;
                    setConfirmNotMatch(true);
                }
                if(validated){
                    requestUpdatePassword(data);
                }

            }

        }
    }

    const requestUpdateInfo = (data) => {
        // set status on submit
        setOnSubmiting(true);

            const dataPackage = {
                shop_name: label == 'shop_name' ? data.shop_name : authContextState.admin_shop_profile.shop_name,
                phonenumber: label == 'phonenumber' ? data.phonenumber : authContextState.admin_shop_profile.phonenumber,
                email:  label == 'email' ? data.email : authContextState.admin_shop_profile.email,
                location:  label == 'location' ? data.location : authContextState.admin_shop_profile.location,
            }

            const config = {
                headers: {
                    Authorization: 'Bearer ' + `${authContextState.authentication.token}`
                }
            }
            axios.post(server.uri + 'admin_shop/profile_update',dataPackage,config)
            .then(
                response => {
                    if(response.data.statusCode == 1 || response.data.statusCode == 2){
                        const newDataPackage = {
                            adminshopID: authContextState.admin_shop_profile.adminshopID,
                            shop_name: label == 'shop_name' ? data.shop_name : authContextState.admin_shop_profile.shop_name,
                            phonenumber: label == 'phonenumber' ? data.phonenumber : authContextState.admin_shop_profile.phonenumber,
                            email: label == 'email' ? data.email : authContextState.admin_shop_profile.email,
                            location: label == 'location' ? data.location : authContextState.admin_shop_profile.location,
                            profile: authContextState.admin_shop_profile.profile,
                        }
                        console.log("update email : ",newDataPackage.email);
                        setOnSubmiting(false);
                        closeModal();
                        authUpdateContextState({type: 'set_admin_shop_profile', payload: newDataPackage});
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                    setOnSubmiting(false);
                    closeModal();
                    alert('Please check out your mail box. Your email is not verify!');
                }
            )

    }

    const requestUpdatePassword = (data) => {

        // set status on submit
        setOnSubmiting(true);

        const dataPackage = {
            current_password: data.password,
            new_password: data.new_password,
            new_password_confirmation: data.confirm_password
        }

        const config = {
            headers: {
                Authorization: 'Bearer ' + `${authContextState.authentication.token}`
            }
        }

        axios.post(server.uri + 'admin_shop/change_password',dataPackage, config)
        .then(
            response => {
                if(response.data.statusCode == 1){
                    console.log(response.data);
                    setOnSubmiting(false);
                    closeModal();
                    alert("Password Successful Changed!");
                }else if(response.data.statusCode == 0){
                    setIncorrectPassword(true);
                    setOnSubmiting(false);
                }
            }
        ).catch(
            error => {
                console.log(error.response)
                closeModal();
                if(error.response.status === 401){
                    alert('Please check out your mail box. Your email is not verify!');
                }
            }

        )

    }

    if(label == 'email'){
        inputType = 'email';
    }else if(label == 'password'){
        inputType = 'password';
    }else {
        inputType = 'text';
    }
    /* Check condition label */
    if(label.localeCompare('password') === 0){

        formUpdate = <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group d-flex flex-column">
                        {/* current password */}
                        <label for={label}>{label}</label>
                        <input key={label} {...register(label, {required: true})} type={inputType} class="form-control" id={label} aria-describedby="Current Password" defaultValue={value} minLength="8" onChange={() => setIncorrectPassword(false)}/>
                        {errors[label]?.type === 'required' && <small id={'error' + label} class="text-danger">Required field !</small>}
                        {incorrectPassword && <small id='incorrectPassAlert' class="text-danger">Incorrect password!</small>}


                        <label for="new_password">New Password</label>
                        <input key="new_password" {...register("new_password", {required: true})} type={inputType} class="form-control" id="new_password" aria-describedby="New Password" defaultValue={value} minLength="8" onChange={() => setIsOldPass(false)}/>
                        {errors.new_password?.type === 'required' && <small id={'error' + 'newPass'} class="text-danger">Required field !</small>}
                        {isOldPass && <small id='oldPassAlert' class="text-danger">Old password!</small>}

                        <label for="confirm_password">Confirm Password</label>
                        <input key="confirm_password" {...register("confirm_password", {required: true})} type={inputType} class="form-control" id="confirm_password" aria-describedby="Confirm Password" defaultValue={value} minLength="8" onChange={() => setConfirmNotMatch(false)}/>
                        {errors.confirm_password?.type === 'required' && <small id={'error' + 'confirmPass'} class="text-danger">Required field !</small>}
                        {confirmNotMatch &&  <small id='NotMatchAlert' class="text-danger">Confirm Password is not match!</small>}

                    </div>
                    <div class="modal-footer">
                            <button id="closeBtn" type="button" class={`btn btn-secondary ${onSubmiting ? 'd-none' : ''}`} data-dismiss="modal">Close</button>
                            <button type="submit" class={`btn btn-primary ${onSubmiting ? 'd-none' : ''}` }>Save changes</button>
                            <div class={`spinner-border text-info ${onSubmiting ? '' : 'd-none'}`} role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                    </div>
                </form>

    }else if(label.localeCompare('phonenumber') != 0){
        formUpdate = <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                    <label for={label}>{label}</label>
                    <input key={label} {...register(label, {required: true})} type={inputType} class="form-control" id={label} aria-describedby="emailHelp" defaultValue={value}/>
                    {errors[label]?.type === 'required' && <small id={'error' + label} class="text-danger">Required field !</small>}
                    </div>
                    <div class="modal-footer">
                            <button id="closeBtn" type="button" class={`btn btn-secondary ${onSubmiting ? 'd-none' : ''}`} data-dismiss="modal">Close</button>
                            <button type="submit" class={`btn btn-primary ${onSubmiting ? 'd-none' : ''}` }>Save changes</button>
                            <div class={`spinner-border text-info ${onSubmiting ? '' : 'd-none'}`} role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                    </div>
                </form>
    }else {

        formUpdate = <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                    <label for={label}>{label}</label>
                    <input key={label} {...register(label, {required: true})} type={inputType} class="form-control" id={label} aria-describedby="emailHelp" defaultValue={value} pattern='^0[0-9]{8,9}$' title="Format ^0[0-9]{8,9}$"/>
                    {errors[label]?.type === 'required' && <small id={'error' + label} class="text-danger">Required field !</small>}
                    </div>
                    <div class="modal-footer">
                            <button id="closeBtn" type="button" class={`btn btn-secondary ${onSubmiting ? 'd-none' : ''}`} data-dismiss="modal">Close</button>
                            <button type="submit" class={`btn btn-primary ${onSubmiting ? 'd-none' : ''}` }>Save changes</button>
                            <div class={`spinner-border text-info ${onSubmiting ? '' : 'd-none'}`} role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                    </div>
                </form>

    }
    /* End check condition label */



    return (

        <>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="updateDialogModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">UPDATE</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {formUpdate}
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export {
    UpdateDialog
}