import React ,{useContext, useEffect}from 'react'
import './../../../Css/Product_Page_Css/Filter-side-bar/filter.css'
import {ProductsContext} from '../../Context/ProductsContext'

function ProductFilter(){

    // const {loading,components,filterBy,setFilterBy} = useContext(PreBuildContext); 
    const {productsContextState, updateProductsContext} = useContext(ProductsContext);

    let INTEL;
    let AMD;
    let intel = [];
    let amd = [];
    var filter = productsContextState.filterBy;

    function handleFilter(cpu) {
        let data = cpu;
            // check if it is got checked
            if(document.getElementById(cpu).checked){
                filter.push(data);
            }else{
                filter.splice(filter.indexOf(data), 1);
            }
            updateProductsContext({type: 'setFilterBy', payload: filter});
    };

    if(productsContextState.loading){
        INTEL = <div className="form-check" style={{paddingLeft: '100px'}}>...</div>
        AMD = <div className="form-check" style={{paddingLeft: '100px'}}>...</div>
    }else{
        productsContextState.products.forEach(product => {
            if(product.cpu.brand.toLowerCase().includes('intel')){
                intel.push(product.cpu.model);
            }else if(product.cpu.brand.toLowerCase().includes('amd')){
                amd.push(product.cpu.model);
            }
        });

        // filter duplicate 
        intel = [...new Set(intel)];
        amd = [...new Set(amd)];
        
        // arrange data to categoried
        INTEL = intel.map(cpu => {
            return <div key={cpu} className="form-check" style={{paddingLeft: '100px'}}>
                        <input className="form-check-input" checked={filter.includes(cpu)} type="checkbox" value={cpu} id={cpu} onChange={ () =>  handleFilter(cpu)}/>
                        <label className="form-check-label" for={cpu} style={{fontSize: '15px'}}>
                        {cpu}
                        </label>
                   </div>
        });
        AMD = amd.map(cpu => {
            return <div key={cpu} className="form-check" style={{paddingLeft: '100px'}}>
                        <input className="form-check-input" checked={filter.includes(cpu)} type="checkbox" value={cpu} id={cpu} onChange={ () =>  handleFilter(cpu)}/>
                        <label className="form-check-label" for={cpu} style={{fontSize: '15px'}}>
                        {cpu}
                        </label>
                   </div>
        });
    }

    return (

        // Filter Component
        <div className="filter">
            <h3 className="filter_title">Shop by</h3>

            <hr/>

            <h5 className="specific_filter_tile"><b>CPU</b></h5>

            <h6 className="sub_specific_filter_title">INTEL</h6>
                {/* Check box for cpu intel */}
                {INTEL}

            <h6 className="sub_specific_filter_title">AMD</h6>
                {/* <!---Check box for AMD intel--> */}
                {AMD}
        </div>

    );
}

export default ProductFilter;