import React from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

const UpdateDialog = (props) => {

    const open = props.open;
    const handleOpen = props.handleClickOpen;
    let updateLabel = props.label;
    let labelValue = props.labelValue;
    console.log(labelValue);
    let inputType = 'text'

    let form_update = <div class="form-group">
                        <label for="updateInput">{updateLabel + '*'}</label>
                        <input type={inputType} class="form-control" id="updateInput" aria-describedby="updateHelp" defaultValue ={labelValue}/>
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>;

    if (updateLabel === 'Email'){
        inputType = 'email';
    }else if (updateLabel === 'Username'){
        inputType = 'text';
    }else if (updateLabel === 'Password'){
        inputType = 'password';
        form_update = <div class="form-group">
                        <label for="updateInput">Old Password*</label>
                        <input type={inputType} class="form-control" id="confirmOldPass" aria-describedby="confirmOldPass"/>
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        <label for="updateInput">{updateLabel + '*'}</label>
                        <input type={inputType} class="form-control" id="updateInput" aria-describedby="updatePassword"/>
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>;

    }

    return (
        
        <>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="UpdateModalCenter" tabindex="-1" role="dialog" aria-labelledby="UpdateModalCenter" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLongTitle">{updateLabel}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            To update {updateLabel.toLowerCase()} in this website, please update the {updateLabel.toLowerCase()} below. We will send updates
                            request to our server.
                            <hr/>
                            {form_update}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => console.log("Save")}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default UpdateDialog;