import React, {useContext} from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import {ProductDetailContext} from './../../Context/productDetailContext';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

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

    const image_container = {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }

    let componentDetail = [];

    if(selectedDetailProduct !== null){
        for(const [key, value] of Object.entries(selectedDetailProduct)){
            if(key !== '_id' && key !== 'index'){
                key === 'price' ? componentDetail.push(<span>{key} : <span className='text-danger'>{value}</span></span>) : componentDetail.push(<span>{key} : {value}</span>)
            }
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
                                    <Chip label="CPU" clickable/>
                                    <Chip label="Motherboard" clickable />
                                    <Chip label="RAM" clickable />
                                    <Chip label="Hard Drive" clickable />
                                    <Chip label="GPU" clickable />
                                    <Chip label="Case" clickable />
                                    <Chip label="Power Supply" clickable />
                                    <Chip label="Monitor" clickable />
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex">
                                    <div className="container">
                                        <h1>Component</h1>
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