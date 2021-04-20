import React from 'react'
import './../../../Css/Product_Page_Css/product_listing/productAsGrid.css'


function ProductListing(){

    return(

        <div className="Grid-display row">
            {/* <!-- Product component as Grid --> */}
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div className="product d-flex flex-column">
                    <img src="https://desktop.goldonecomputer.com/image/cache/catalog/products/Case/JESM%20BT/11-400x400.jpg"/>
                    <br/>
                    <h5 className="description">Aigo BT Mini( Micro ATX MB / Front USB 3.0 )</h5>  
                    <h6 className="price">$29.00</h6>
                    <button className="detailBtn btn btn-primary btn-sm">Detail</button>  
                </div>
            </div>
        </div>

    );

}

export default ProductListing;