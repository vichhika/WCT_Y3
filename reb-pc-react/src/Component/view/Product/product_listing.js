import React ,{useContext,useState,useEffect} from 'react'
import './../../../Css/Product_Page_Css/product_listing/productAsGrid.css';
import Pagination from '@material-ui/lab/Pagination';
import {paginate} from './../../../utililty/paginate'
import { getComponentskey } from '../../../utililty/getComponentsKey';
import { Link } from 'react-router-dom';
import {ProductsContext} from './../../Context/ProductsContext'


function ProductListing(props){
    const paginateNum = 12;

    const {productsContextState,updateProductsContext} = useContext(ProductsContext);
    let page = productsContextState.page;


    const handlePageChange = (event,page) => {
        updateProductsContext({type: 'setPage', payload: page});
    }

    let view;
    let paginateView;
    if(productsContextState.loading){
        view = <h6 className="w-100 text-center">Loading...</h6>;
    }else{        

        // const componentsNum = productsContextState.productsFilter.length;
        // const pageCount =  Math.ceil(componentsNum / paginateNum);
        let pageCount = Math.ceil(productsContextState.totalProducts / paginateNum);
        const products = paginate(productsContextState.productsFilter, page, paginateNum);
        // const products = productsContextState.productsFilter;
        view = products.map(product => {
            return <div key={product.productbuildID} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="product d-flex flex-column" style={{marginBottom:'0px'}}>
                <span class="badge badge-info" style={{
                        alignSelf: 'baseline',
                        transform: 'translate(-18px, -10px)'}}>{product.user}</span>
                    <img src="https://www.chantracomputer.com/DESKTOP%20SYSTEM/CASE/AEROCOOL/TOR-PRO-RGB.gif"/>
                    <br/>
                    <h5 className="description">{product.cpu.brand + ' | ' + product.cpu.model + ' | cores ' + product.cpu.cores + ' | RAM ' + product.memory.brand + ' ' + product.memory.module_type}</h5>  
                <h6 className="price">{'$' + product.totalprice}</h6>
                <Link id={"btn" + product.productbuildID} onClick={() => props.selectDetailProduct(product)} to='/productDetail' style={{textDecoration: 'none'}} >Show Detail <i class="fad fa-arrow-right"/></Link>
                    {/* <button >Detail</button> */}
                    {/* <Link id={"btn" + product.productbuildID} className="detailBtn btn btn-outline-info btn-sm text-info" onClick={() => props.selectDetailProduct(product)} to='/productDetail'>Detail</Link>   */}
                </div>
            </div>
        });

        if(pageCount > 1){
            paginateView = <Pagination count={pageCount} page={page > pageCount ? 1 : page} shape="rounded" 
                                   onChange={handlePageChange} />;
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