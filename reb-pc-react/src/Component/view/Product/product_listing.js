import React ,{useContext,useEffect} from 'react'
import { PreBuildContext } from '../../Context/PreBuildContext';
import './../../../Css/Product_Page_Css/product_listing/productAsGrid.css'



function ProductListing(){

    const {loading,filterComponents} = useContext(PreBuildContext);

    let view;
    if(loading){
        view = <h6 className="w-100 text-center">Loading...</h6>;
    }else{
        view = filterComponents.cpu.map(cpu => {
            return <div key={cpu._id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <div className="product d-flex flex-column" style={{marginBottom:'30px'}}>
                    <img src="https://desktop.goldonecomputer.com/image/cache/catalog/products/Case/JESM%20BT/11-400x400.jpg"/>
                    <br/>
                    <h5 className="description">{cpu.brand + ' | ' + cpu.model + ' | cores ' + cpu.cores}</h5>  
                <h6 className="price">{cpu.price}</h6>
                    <button className="detailBtn btn btn-primary btn-sm">Detail</button>  
                </div>
            </div>
        });
    }

    return(
        
        <div className="Grid-display row">
            {/* <!-- Product component as Grid --> */}
            {view}
        </div>
    );

}

export default ProductListing;