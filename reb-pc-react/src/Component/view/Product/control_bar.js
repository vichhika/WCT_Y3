import React, {useContext, useEffect} from 'react'
import '../../../Css/Product_Page_Css/control-bar_css/control-bar.css'
import { PreBuildContext } from '../../Context/PreBuildContext';

function ControlBar(){

    const {sortAs, setSortAs} = useContext(PreBuildContext);

    return (

        // <!--Control-bar Component-->
        <div className="control-bar d-flex justify-content-between">
            <div className="displayOption d-flex align-self-center">
                <i className="fas fa-th" style={{marginLeft: '16px', marginRight: '16px'}}></i>
                <i className="far fa-bars" style={{marginRight: '16px'}}></i>
                <i className="far fa-list" style={{margiRight: '16px'}}></i>
            </div>
            <div className="sortOption">
                <div className="sortIn input-group-sm">
                    <select className="custom-select" id="sortSelection" onChange={() => setSortAs(document.getElementById('sortSelection').value)}>
                        <option selected>Default Sort</option>
                        <option value='ASC'>lower to higher (price)</option>
                        <option value='DESC'>higer to lower (price)</option>
                    </select>
                </div>
            </div>
        </div>

    );
}

export default ControlBar;