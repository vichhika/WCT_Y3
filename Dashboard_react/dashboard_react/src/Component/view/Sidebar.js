import React, {useContext, useEffect, useRef, useState} from "react";
import cpu from './../../img/componentImg/cpu.png';
import motherboard from './../../img/componentImg/motherboard.png';
import ram from './../../img/componentImg/ram.webp';
import hdd from './../../img/componentImg/hdd.png';
import gpu from './../../img/componentImg/gpu.webp';
import pc_case from './../../img/componentImg/case.png';
import power from './../../img/componentImg/power.webp';
import monitor from './../../img/componentImg/monitor.jpg';
import server from './../../config.json'
import {Link, useHistory, useLocation} from "react-router-dom";
import {ProductContext} from "../Context/ProductContext";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

function Sidebar() {

    const params = useLocation().pathname;
    const {authContextState, authUpdateContextState} = useContext(AuthContext);
    const {contextProductState, updateContextProductState} = useContext(ProductContext);
    const [shopName, setShopName] = useState('Your Shop');
    const history = useHistory();
    const liClickHandler = componentIndex => {
        updateContextProductState({
            type: 'set_componentIndex',
            payload: componentIndex
        })
        if(componentIndex >= 1 && componentIndex <=8){
            history.push("/productList")
        }else{
            history.push("/")
        }
    }

    useEffect( () => {
        /* check if email verify then request profile */
        if(authContextState.isVerify){

            if(authContextState.admin_shop_profile == null){
                const config = {
                    headers: {'Authorization' : 'Bearer ' + `${authContextState.authentication.token}`}
                }
                axios.get(server.uri + 'admin_shop/profile_info', config)
                .then(
                    response => {
                        if(response.data.statusCode == 1){
                            console.log(response.data.message[0]);
                            authUpdateContextState({type: 'set_admin_shop_profile', payload: response.data.message[0]});
                            setShopName(response.data.message[0].shop_name);
                        }
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
            }else {
                setShopName(authContextState.admin_shop_profile.shop_name);
            }
        }else {
            setShopName('Your Shop');
        }
        /* End request profile */
    })

    return (
        <div className="sidebar" data-color="purple" data-background-color="white"
             data-image="./assets/img/sidebar-1.jpg">
            <div className="logo">
                <Link to="/Profile" class="simple-text logo-normal">{shopName}</Link>
            </div>

            <div className="sidebar-wrapper ps-container ps-theme-default"
                 data-ps-id="43547ff9-35bc-aa15-24be-f224dd683b81">
                <ul className="nav">

                    <li onClick={() => liClickHandler(0)}
                        className={contextProductState.componentIndex === 0 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link" to="/">
                            <i className="material-icons">dashboard</i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(1)}
                        className={contextProductState.componentIndex === 1 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={cpu} height="25" width="25"/>
                            <p className="ml-4">CPU</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(2)}
                        className={contextProductState.componentIndex === 2 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={motherboard} height="25" width="25"/>
                            <p className="ml-4">Motherboard</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(3)}
                        className={contextProductState.componentIndex === 3 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={ram} height="25" width="25"/>
                            <p className="ml-4">RAM</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(4)}
                        className={contextProductState.componentIndex === 4 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={hdd} height="25" width="25"/>
                            <p className="ml-4">Disk</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(5)}
                        className={contextProductState.componentIndex === 5 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={gpu} height="25" width="25"/>
                            <p className="ml-4">GPU</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(6)}
                        className={contextProductState.componentIndex === 6 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={pc_case} height="25" width="25"/>
                            <p className="ml-4">Case</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(7)}
                        className={contextProductState.componentIndex === 7 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
                            <img src={power} height="25" width="25"/>
                            <p className="ml-4">Power Supply</p>
                        </Link>
                    </li>
                    <li onClick={() => liClickHandler(8)}
                        className={contextProductState.componentIndex === 8 ? "nav-item active" : "nav-item"}>
                        <Link class="nav-link d-flex justify-content-start">
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