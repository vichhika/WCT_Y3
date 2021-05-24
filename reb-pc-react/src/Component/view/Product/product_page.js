import React ,{useContext}from 'react'
import ProductFilter from './product_filter'
import './../../../Css/Product_Page_Css/product_page.css'
import ControlBar from './control_bar'
import ProductListing from './product_listing'
import PaginateContextProvider from './../../Context/PaginateContext';
import {ProductDetailContext} from './../../Context/productDetailContext';

function ProductPage(){

    const {selectDetailProduct} = useContext(ProductDetailContext);
    
    document.body.style.backgroundImage = 'none';

    return (
        <div className="conatiner-fluid d-flex" style={{paddingTop: '100px'}}>

            {/* !--Filter Component-- */}
            <ProductFilter/>

            <div className="products container">
                <h4><b>Computer Custom</b></h4>
                <ControlBar/>
                <hr/>
                <PaginateContextProvider>
                    <ProductListing selectDetailProduct={selectDetailProduct}/>
                </PaginateContextProvider>
                <br></br>
            </div>

        </div>
    );
}

export default ProductPage;