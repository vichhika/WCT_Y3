<<<<<<< HEAD
import "./App.css";
import Navbar from "./Component/view/Navigation/navbar.js";
import {BrowserRouter, Route, useLocation} from "react-router-dom";
import Blog from "./Component/view/Blog";
import Donate from "./Component/view/donate";
import Build from "./Component/view/Build/Build";
import Product from "./Component/view/Product/product_page";
import Login from "./Component/view/LoginAndSignUp/Login";
import Signup from "./Component/view/LoginAndSignUp/SignUp";
import Home from "./../src/Component/view/HomePage/Home"
import {AuthContextProvider} from "./Component/Context/AuthContext";
import PreBuildContextProvider from "./Component/Context/PreBuildContext";
import SummeryBuild from "./Component/view/Build/SummeryBuild";
import Profile from "./Component/view/My Build/Profile";
import ProductDetail from './Component/view/Product/productDetail'
import ProductDetailContextProvider from './Component/Context/productDetailContext'
import Dashboard from "./Component/view/ShopOwner/Dashboard";

import {BuildContextProvider} from "./Component/Context/BuildContext";
import React from "react";
import * as url from "url";

function App() {
    let path = useLocation();
    let background;
    if (path.pathname === '/') {
        background = {backgroundColor: 'white'}
    }else{
        background = {backgroundImage: `url("https://www.turn-on.de/media/cache/article_images/media/cms/2019/09/intel-amd-motherboard-mainboard-prozessor-chip.jpg?7631")`}
    }

  return (
    <div className="App" style={{ height: "100%" }}>
      
        {/* <Navbar/> */}
      <Route path="/" exact component={Home}/>
      <Route path="/Blog" component={Blog} />
      <Route path="/donate" component={Donate} />
      <BuildContextProvider>
        <Route path="/build" component={Build} />
        <Route path="/summeryBuild" component={SummeryBuild}/>
      </BuildContextProvider>
      <PreBuildContextProvider>
        <ProductDetailContextProvider>
          <Route path="/product_page" component={Product} />
          <Route path="/productDetail" component={ProductDetail}/>
        </ProductDetailContextProvider>
      </PreBuildContextProvider>
      <Route path="/Login" component={Login} />
      <Route path="/SignUp" component={Signup} />
      <Route path="/profile" component={Profile}/>
      <Route path="/dashboard" component={Dashboard}/>
      
    </div>
  );
}

export default App;
=======
import "./App.css";
import Navbar from "./Component/view/Navigation/navbar.js";
import {BrowserRouter, Route, useLocation} from "react-router-dom";
import Blog from "./Component/view/Blog";
import Donate from "./Component/view/donate";
import Build from "./Component/view/Build/Build";
import Product from "./Component/view/Product/product_page";
import Login from "./Component/view/LoginAndSignUp/Login";
import Signup from "./Component/view/LoginAndSignUp/SignUp";
import Home from "./../src/Component/view/HomePage/Home"
import {AuthContextProvider} from "./Component/Context/AuthContext";
import PreBuildContextProvider from "./Component/Context/PreBuildContext";
import SummeryBuild from "./Component/view/Build/SummeryBuild";
import Profile from "./Component/view/My Build/Profile";
import ProductDetail from './Component/view/Product/productDetail'
import ProductDetailContextProvider from './Component/Context/productDetailContext'

import {BuildContextProvider} from "./Component/Context/BuildContext";
import React from "react";
import * as url from "url";
import {Switch} from "react-router-dom";
import PageNotfound from "./Component/view/PageNotFound";

function App() {

    return (
        <div className="App" style={{height: "100%"}}>
            <Switch>
                <Route exact path="/"><Navbar/><Home/></Route>
                <Route path="/blog"> <Navbar/><Blog/></Route>
                <Route path="/donate"> <Navbar/><Donate/></Route>
                <Route path="/login"><Navbar/><Login/></Route>
                <Route path="/signUp"><Navbar/><Signup/></Route>
                <Route path="/profile"><Navbar/><Profile/></Route>
                <Route path="/build">
                    <BuildContextProvider>
                        <Navbar/><Build/>
                    </BuildContextProvider>
                </Route>
                <Route path="/summeryBuild">
                    <BuildContextProvider>
                        <Navbar/><SummeryBuild/>
                    </BuildContextProvider>
                </Route>
                <Route path="/product_page">
                    <PreBuildContextProvider>
                        <ProductDetailContextProvider>
                            <Navbar/><Product/>
                        </ProductDetailContextProvider>
                    </PreBuildContextProvider>
                </Route>
                <Route path="/productDetail">
                    <PreBuildContextProvider>
                        <ProductDetailContextProvider>
                            <Navbar/><ProductDetail/>
                        </ProductDetailContextProvider>
                    </PreBuildContextProvider>
                </Route>
                <Route path="*"><PageNotfound/></Route>
            </Switch>
        </div>
    );
}

export default App;
>>>>>>> main
