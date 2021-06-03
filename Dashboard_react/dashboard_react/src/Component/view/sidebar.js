
import React from "react";
import cpu from '../../img/componentImg/cpu.png'
import {Link,Router} from "react-router-dom";

function Sidebar(){

    
    return (
  
        <div class="sidebar" data-color="purple" data-background-color="white" data-image="./assets/img/sidebar-1.jpg">
 
        <div class="logo"><Link to="http://reabpc.digital/" class="simple-text logo-normal">
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
                <img src={cpu} height="25" width="25"></img>
                <p  class="ml-4">Motherboard</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="RAM">
                <img src={cpu} height="25" width="25"></img>  
                <p  class="ml-4">RAM</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Disk">
              <img src={cpu} height="25" width="25"></img>
                <p  class="ml-4">Disk</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="GPU">
              <img src={cpu} height="25" width="25"></img>
                <p class="ml-4">GPU</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Case">
              <img src={cpu} height="25" width="25"></img>
                <p class="ml-4">Case</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Power Supply">
              <img src={cpu} height="25" width="25"></img>
                <p class="ml-4">Power Supply</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link d-flex justify-content-start" to="Monitor">
              <img src={cpu} height="25" width="25"></img>
                <p class="ml-4">Monitor</p>
              </Link>
            </li>
        
          </ul>
        <div class="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}><div class="ps-scrollbar-x" tabindex="0" style={{left: "0px", width: "0px"}}></div></div><div class="ps-scrollbar-y-rail" style={{top: "0px", right: "0px"}}><div class="ps-scrollbar-y" tabindex="0" style={{top: "0px", height: "0px"}}></div></div></div>
      <div class="sidebar-background" style={{backgroundImage: "url(./assets/img/sidebar-1.jpg) "}}></div></div>
    


    
        );
     
    }
export default Sidebar;