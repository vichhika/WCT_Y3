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
    let inputType = 'text'

    if (updateLabel === 'Email'){
        inputType = 'email';
    }else if (updateLabel === 'Username'){
        inputType = 'text';
    }else if (updateLabel === 'Password'){
        inputType = 'password';
    }

    return (
        <>
            <Dialog open={open} onClose={() => handleOpen(false) } aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{updateLabel}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To update {updateLabel.toLowerCase()} in this website, please update the {updateLabel.toLowerCase()} below. We will send updates
                            request to our server.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={updateLabel}
                            defaultValue={labelValue}
                            type={inputType}
                            fullWidth
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleOpen(false)} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

export default UpdateDialog;