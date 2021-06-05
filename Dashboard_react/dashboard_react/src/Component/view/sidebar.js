import React, {useContext, useRef} from "react";
import cpu from './../../img/componentImg/cpu.png';
import motherboard from './../../img/componentImg/motherboard.png';
import ram from './../../img/componentImg/ram.webp';
import hdd from './../../img/componentImg/hdd.png';
import gpu from './../../img/componentImg/gpu.webp';
import pc_case from './../../img/componentImg/case.png';
import power from './../../img/componentImg/power.webp';
import monitor from './../../img/componentImg/monitor.jpg';

import {Link, useLocation} from "react-router-dom";
import {ProductContext} from "../productContext";

function Sidebar() {

    const params = useLocation().pathname;
    const {contextProductState, updateContextProductState} = useContext(ProductContext);

    const liClickHandler = componentIndex => {
        updateContextProductState({
            type: 'set_componentIndex',
            payload: componentIndex
        })
    }

    return (
        <div className="sidebar" data-color="purple" data-background-color="white"
             data-image="./assets/img/sidebar-1.jpg">
            <div className="logo"><Link to="/" class="simple-text logo-normal">Your Shop</Link></div>

            <div className="sidebar-wrapper ps-container ps-theme-default"
                 data-ps-id="43547ff9-35bc-aa15-24be-f224dd683b81">
                <ul className="nav">
                    <li data-color="azure" className={params.localeCompare("/") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link" to="/">
                            <i className="material-icons">dashboard</i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(1)}
                        className={params.localeCompare("/cpu") === 0 || params.localeCompare("/cpu/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/cpu">
                            <img src={cpu} height="25" width="25"/>
                            <p className="ml-4">CPU</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(2)}
                        className={params.localeCompare("/motherboard") === 0 || params.localeCompare("/motherboard/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/motherboard">
                            <img src={motherboard} height="25" width="25"/>
                            <p className="ml-4">Motherboard</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(3)}
                        className={params.localeCompare("/ram") === 0 || params.localeCompare("/ram/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/ram">
                            <img src={ram} height="25" width="25"/>
                            <p className="ml-4">RAM</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(4)}
                        className={params.localeCompare("/disk") === 0 || params.localeCompare("/disk/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/disk">
                            <img src={hdd} height="25" width="25"/>
                            <p className="ml-4">Disk</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(5)}
                        className={params.localeCompare("/gpu") === 0 || params.localeCompare("/gpu/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/gpu">
                            <img src={gpu} height="25" width="25"/>
                            <p className="ml-4">GPU</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(6)}
                        className={params.localeCompare("/case") === 0 || params.localeCompare("/case/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/case">
                            <img src={pc_case} height="25" width="25"/>
                            <p className="ml-4">Case</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(7)}
                        className={params.localeCompare("/power_supply") === 0 || params.localeCompare("/power_supply/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/power_supply">
                            <img src={power} height="25" width="25"/>
                            <p className="ml-4">Power Supply</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(8)}
                        className={params.localeCompare("/monitor") === 0 || params.localeCompare("/monitor/addProduct") === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start" to="/monitor">
                            <img src={monitor} height="25" width="25"/>
                            <p className="ml-4">Monitor</p>
                        </Link>
                    </li>

                </ul>
                <div className="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                    <div className="ps-scrollbar-x" tabIndex="0" style={{left: "0px", width: "0px"}}/>
                </div>
                <div className="ps-scrollbar-y-rail" style={{top: "0px", right: "0px"}}>
                    <div className="ps-scrollbar-y" tabIndex="0" style={{top: "0px", height: "0px"}}/>
                </div>
            </div>
            <div className="sidebar-background" style={{backgroundImage: "url(./assets/img/sidebar-1.jpg) "}}/>
        </div>

    );

}

export default Sidebar;