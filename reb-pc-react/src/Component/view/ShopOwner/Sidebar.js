import React from "react";
import {Link} from "react-router-dom";
import cpu from '../../../img/componentImg/cpu.png'
import motherboard from '../../../img/componentImg/motherboard.png'
import ram from '../../../img/componentImg/ram.webp'
import disk from '../../../img/componentImg/hdd.png'
import gpu from '../../../img/componentImg/gpu.webp'
import Mcase from '../../../img/componentImg/case.png'
import powerSupply from '../../../img/componentImg/power.webp'
import monitor from '../../../img/componentImg/monitor.jpg'


function Sidebar(){

    
    return (
   
 
        <div class="sidebar" data-color="purple" data-background-color="white" data-image="./assets/img/sidebar-1.jpg">
 
        <div class="logo"><Link to="http://www.creative-tim.com" class="simple-text logo-normal">
            Creative Tim
          </Link></div>
        <div class="sidebar-wrapper ps-container ps-theme-default" data-ps-id="43547ff9-35bc-aa15-24be-f224dd683b81">
          <ul class="nav">
            <li class="nav-item active  ">
              <Link class="nav-link" to="ShopOwner/dashboard">
                <i class="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li class="nav-item " >
              <Link class="nav-link d-flex justify-content-start" to="CPU">
               <img src={cpu} height="25" width="25"></img>
                <p class="ml-4">CPU</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Motherboard">
                <img src={motherboard} height="25" width="25"></img>
                <p  class="ml-4">Motherboard</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="RAM">
                <img src={ram} height="25" width="25"></img>  
                <p  class="ml-4">RAM</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Disk">
              <img src={disk} height="25" width="25"></img>
                <p  class="ml-4">Disk</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="GPU">
              <img src={gpu} height="25" width="25"></img>
                <p class="ml-4">GPU</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Case">
              <img src={Mcase} height="25" width="25"></img>
                <p class="ml-4">Case</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Power Supply">
              <img src={powerSupply} height="25" width="25"></img>
                <p class="ml-4">Power Supply</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Monitor">
              <img src={monitor} height="25" width="25"></img>
                <p class="ml-4">Monitor</p>
              </Link>
            </li>
        
          </ul>
        <div class="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}><div class="ps-scrollbar-x" tabindex="0" style={{left: "0px", width: "0px"}}></div></div><div class="ps-scrollbar-y-rail" style={{top: "0px", right: "0px"}}><div class="ps-scrollbar-y" tabindex="0" style={{top: "0px", height: "0px"}}></div></div></div>
      <div class="sidebar-background" style={{backgroundImage: "url(./assets/img/sidebar-1.jpg) "}}></div></div>
      
        );
    }
export default Sidebar;