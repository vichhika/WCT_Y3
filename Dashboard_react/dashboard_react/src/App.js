import './App.css';
import Dashboard from './Component/view/dashboard'
import {Route, Switch} from "react-router-dom";
import Sidebar from "./Component/view/sidebar";
import Navbar from "./Component/view/navbar";
import PageNotFound from "./Component/view/PageNotFound"
import Footer from "./Component/view/footer";
import ProductList from "./Component/view/productList";
import AddProductPage from "./Component/view/addProductPage";


function App() {
    return (

        <div className="App" style={{height: "100%"}}>
            <Sidebar/>
            <div className="main-panel">
                {/*<Navbar/>*/}
                <div className="content m-0">
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/"><Dashboard/></Route>
                            <Route path="/(cpu|motherboard|ram|disk|gpu|case|power_supply|monitor)/addProduct"><AddProductPage/></Route>
                            <Route path="/(cpu|motherboard|ram|disk|gpu|case|power_supply|monitor)"><ProductList/></Route>
                            <Route path="*"><PageNotFound/></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default App;
