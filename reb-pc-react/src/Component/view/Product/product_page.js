import React from 'react'
import ProductFilter from './product_filter'
import './../../../Css/Product_Page_Css/product_page.css'
import ControlBar from './control_bar'
import ProductListing from './product_listing'
import Pagination from './pagination'

function ProductPage(){
    document.body.style.backgroundImage = 'none';
    return (
        <div className="conatiner-fluid d-flex" style={{paddingTop: '100px'}}>

            {/* !--Filter Component-- */}
            <ProductFilter/>

            <div className="products container">

                <h4><b>Computer Custom</b></h4>
                <ControlBar/>
                <hr/>
                <ProductListing/>
                <hr/>
                <Pagination/>
            </div>

        </div>
    );
}

export default ProductPage;