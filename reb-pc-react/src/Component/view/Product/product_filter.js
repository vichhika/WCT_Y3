import React from 'react'
import './../../../Css/Product_Page_Css/Filter-side-bar/filter.css'

function ProductFilter(){
    return (

        // Filter Component
        <div className="filter">
            <h3 className="filter_title">Shop by</h3>

            <hr/>

            <h5 className="specific_filter_tile"><b>CPU</b></h5>

            <h6 className="sub_specific_filter_title">INTEL</h6>
                {/* Check box for cpu intel */}
                <div className="form-check" style={{paddingLeft: '100px'}}>
                    <input className="form-check-input" type="checkbox" value="" id="inteli3"/>
                    <label className="form-check-label" for="inteli3" style={{fontSize: '15px'}}>
                    CORE i3
                    </label>
                </div>
                <div className="form-check" style={{paddingLeft: '100px'}}>
                    <input className="form-check-input" type="checkbox" value="" id="inteli5"/>
                    <label className="form-check-label" for="inteli5" style={{fontSize: '15px'}}>
                    CORE i5
                    </label>
                </div>
                <div className="form-check" style={{paddingLeft: '100px'}}>
                    <input className="form-check-input" type="checkbox" value="" id="inteli7"/>
                    <label className="form-check-label" for="inteli7" style={{fontSize: '15px'}}>
                    CORE i7
                    </label>
                </div>

            <h6 className="sub_specific_filter_title">AMD</h6>
                {/* <!---Check box for AMD intel--> */}
                <div className="form-check" style={{paddingLeft: '100px'}}>
                    <input className="form-check-input" type="checkbox" value="" id="amd1"/>
                    <label className="form-check-label" for="amd1" style={{fontSize: '15px'}}>
                    AMD...
                    </label>
                </div>
                <div className="form-check" style={{paddingLeft: '100px'}}>
                    <input className="form-check-input" type="checkbox" value="" id="amd2"/>
                    <label className="form-check-label" for="amd2" style={{fontSize: '15px'}}>
                    AMD...
                    </label>
                </div>
        </div>

    );
}

export default ProductFilter;