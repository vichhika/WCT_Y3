import './App.css';
import Dashboard from './Component/view/Dashboard'
import {Redirect, Route, Switch} from "react-router-dom";
import Sidebar from "./Component/view/Sidebar";
import Navbar from "./Component/view/Navbar";
import PageNotFound from "./Component/view/PageNotFound"
import Footer from "./Component/view/Footer";
import ProductList from "./Component/view/ProductList";
import AddProductPage from "./Component/view/AddProductPage";
import Login from "./Component/view/Login";
import {AuthContext} from "./Component/Context/AuthContext";
import {useContext, useEffect} from "react";
import PageNotfound from "./Component/view/PageNotFound";
import Register from "./Component/view/Register";
import VerifyPage from "./Component/view/VerifyPage";

function App() {
    const {authContextState, authUpdateContextState} = useContext(AuthContext)

    return (

        <Switch>
            <Route exact path="/">
                <div className="App" style={{height: "100%"}}>
                    {authContextState.authentication.isAuthentication && <Sidebar/>}
                    <div className="main-panel">
                        <div className="content m-0">
                            <div className="container-fluid">
                                {authContextState.authentication.isAuthentication ?
                                    authContextState.isVerify ? <Dashboard/> : <Redirect to="/verify"/> : <Redirect to="/login"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
            <Route path="/productList">
                <div className="App" style={{height: "100%"}}>
                    {authContextState.authentication.isAuthentication && <Sidebar/>}
                    <div className="main-panel">
                        <div className="content m-0">
                            <div className="container-fluid">
                                {authContextState.authentication.isAuthentication ?
                                    authContextState.isVerify ? <ProductList/> : <Redirect to="/verify"/>
                                    : <Redirect to="/login"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
            <Route path="/addProduct">
                <div className="App" style={{height: "100%"}}>
                    {authContextState.authentication.isAuthentication && <Sidebar/>}
                    <div className="main-panel">
                        <div className="content m-0">
                            <div className="container-fluid">
                                {authContextState.authentication.isAuthentication ?
                                    authContextState.isVerify ? <AddProductPage/> : <Redirect to="/verify"/>
                                    : <Redirect to="/login"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
            <Route path="/verify">{authContextState.authentication.isAuthentication ? <VerifyPage/> :
                <Redirect to="/login"/>}</Route>
            <Route path="/login"><Login/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="*"><PageNotfound/></Route>
        </Switch>

    )

}

export default App;
