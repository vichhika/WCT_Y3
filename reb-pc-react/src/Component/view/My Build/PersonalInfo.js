import React from 'react';
import UpdateDialog from './updateDialog';


const cardHeaderFormate = {
    backgroundColor: 'white',
    borderBottom: 'none',
}

const PersonalInfo = () => {
    const initState = {
        label: '',
        value: '',
    }
    const [open, setOpenDialog] = React.useState(false);
    const [state, setState] = React.useState(initState);
    const handleClickOpen = (open) => {
        setOpenDialog(open);
    }

    const handleClickUpdate = (selectedlabel, itsValue) => {

        setState({label: selectedlabel, value: itsValue});
        handleClickOpen(true);

    }

    return (
        <>
            <h2 className='text-center'>Personal info</h2>
            <div className="container-fluid d-flex justify-content-center">
                <div className="card mt-4" style={{width: '80%'}}>
                    <div class="card-header" style={cardHeaderFormate}>
                        <h4 className="card-title">Basic info</h4>
                        <p className="card-text">Here are some information that you have provide us since you registered.</p>
                    </div>
                    <br/>
                    <div className="card-body p-0">

                        {/*list user personal information */}
                        <div class="list-group">

                            <a href="#" class="list-group-item list-group-item-action" onClick={() => handleClickUpdate('UserName', 'Tith Sambath')}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>UserName</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>Tith Sambath</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action" onClick={() => handleClickUpdate('Email', 'dilytithsambath@gmail.com')}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Email</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>dilytithsambath@gmail.com</p>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="list-group-item list-group-item-action" onClick={() => handleClickUpdate('Password', '')}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className='mb-0'>Password</p>
                                    </div>
                                    <div className="col">
                                        <p className='mb-0'>********************</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <UpdateDialog open={open} handleClickOpen={handleClickOpen} label={state.label} labelValue={state.value}/>

        </>
    );

}

export default PersonalInfo;