import React ,{useContext,useState,useEffect} from 'react'
import { PreBuildContext } from '../../Context/PreBuildContext';
import './../../../Css/Product_Page_Css/product_listing/productAsGrid.css';
import Pagination from '@material-ui/lab/Pagination';
import {paginate} from './../../../utililty/paginate'
import { getComponentskey } from '../../../utililty/getComponentsKey';
import { Link } from 'react-router-dom';

function ProductListing(props){
    const paginateNum = 12;
    let count = 0;
    let seletedFilter = [];

    const {loading,filterComponents,filterBy,currentPage,setCurrentPage} = useContext(PreBuildContext);

    const handlePageChange = (event,page) => {
        setCurrentPage(page);
    }

    let view;
    let paginateView;
    if(loading){
        view = <h6 className="w-100 text-center">Loading...</h6>;
    }else{        

        const componentsNum = filterComponents.cpu.length;
        const itemCount =  Math.ceil(componentsNum / paginateNum);
        const components = paginate(filterComponents.cpu, currentPage, paginateNum);

        view = components.map(cpu => {
            return <div key={cpu._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="product d-flex flex-column" style={{marginBottom:'0px'}}>
                    <img src="https://www.chantracomputer.com/DESKTOP%20SYSTEM/CASE/AEROCOOL/TOR-PRO-RGB.gif"/>
                    <br/>
                    <h5 className="description">{cpu.brand + ' | ' + cpu.model + ' | cores ' + cpu.cores}</h5>  
                <h6 className="price">{cpu.price}</h6>
                    {/* <button >Detail</button> */}
                    <Link id={"btn" + cpu._id} className="detailBtn btn btn-primary btn-sm" onClick={() => props.selectDetailProduct(cpu)} to='/productDetail' >Detail</Link>  
                </div>
            </div>
        });
        
        if(itemCount > 1){
            paginateView = <Pagination count={itemCount} page={currentPage > itemCount ? 1 : currentPage} shape="rounded" 
                                   onChange={currentPage <= itemCount ? handlePageChange : setCurrentPage(1)} />;
        }
    }

    return(
        
        <>
            <div className="Grid-display row">
                {/* <!-- Product component as Grid --> */}
                {view}
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
                {paginateView}
            </div>
        </>
    );

}

export default ProductListing;