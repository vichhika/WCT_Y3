import React, {useContext, useState} from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import {ProductDetailContext} from './../../Context/productDetailContext';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
/**
 * Detail Product Page
 */

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
}));

const outterStyle = {
    marginTop: '8vh'
}

function ProductDetail() {
    const classes = useStyles();
    const {selectedDetailProduct} = useContext(ProductDetailContext);
    const [selectedComponent, setSeletedComponent] = useState('cpu');
    const image_container = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }

    let history = useHistory();
    window.onload = () => {
        history.goBack()
    }

    let componentDetail = [];
    console.log(selectedDetailProduct);

    const handleSeletedComponent = (componentSelected) => {

        switch(componentSelected){
            case 'CPU' : setSeletedComponent('cpu');break;
            case 'Motherboard' : setSeletedComponent('motherboard');break;
            case 'RAM' : setSeletedComponent('memory');break;
            case 'Hard Drive' : setSeletedComponent('internalharddrive');break;
            case 'GPU' : setSeletedComponent('videocard');break;
            case 'Case' : setSeletedComponent('casepc');break;
            case 'Power Supply' : setSeletedComponent('powersupply');break;
            case 'Monitor' : setSeletedComponent('monitor');break;
        }

    }

    // query component detail
    if(selectedDetailProduct !== null){
        for(const [key, value] of Object.entries(selectedDetailProduct[selectedComponent])){
            if(key !== 'productbuildID' && key !== 'user' && !key.includes('ID')){
                key === 'totalprice' ? componentDetail.push(<span key={key} >{key} : <span className='text-danger'>{'$'+value}</span></span>) : componentDetail.push(<span key={key}>{key} : {value}</span>)
            }
            console.log(key);
            console.log(value);
        }
    }

    return (
            <div className="container" style={outterStyle}>

                <Link to='/product_page' style={{textDecoration: 'none', marginLeft:'8px'}}><i class="fad fa-angle-left"></i> back</Link>
                <br/>

                <Box
                    boxShadow={6}
                    bgcolor="background.paper"
                    m={1}
                    p={1}
                >
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">  
                                    <div className="container" style={image_container}>
                                        <img className="ml-3" src="https://www.chantracomputer.com/DESKTOP%20SYSTEM/CASE/AEROCOOL/TOR-PRO-RGB.gif" width='auto' height='auto'></img>
                                    </div>

                                    <hr/>

                                    <h6><b>Other</b></h6>

                                    <div className={classes.root}>
                                        <Chip label="CPU" clickable onClick={()=>handleSeletedComponent('CPU')}/>
                                        <Chip label="Motherboard" clickable onClick={()=>handleSeletedComponent('Motherboard')} />
                                        <Chip label="RAM" clickable onClick={()=>handleSeletedComponent('RAM')} />
                                        <Chip label="Hard Drive" clickable onClick={()=>handleSeletedComponent('Hard Drive')} />
                                        <Chip label="GPU" clickable onClick={()=>handleSeletedComponent('GPU')} />
                                        <Chip label="Case" clickable onClick={()=>handleSeletedComponent('Case')} />
                                        <Chip label="Power Supply" clickable onClick={()=>handleSeletedComponent('Power Supply')} />
                                        <Chip label="Monitor" clickable onClick={()=>handleSeletedComponent('Monitor')} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-flex">
                                        <div className="container">
                                            <h1>{selectedComponent.toUpperCase()}</h1>
                                            {
                                                componentDetail.map((detail) => {
                                                    return <p>{detail}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Box>
            </div>
 
    );

}

export default ProductDetail;