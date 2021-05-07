
import "./App.css";
import Navbar from "./Component/view/Navigation/navbar.js";
import { Route } from "react-router-dom";
import Blog from "./Component/view/Blog";
import Donate from "./Component/view/donate";
import Build from "./Component/view/Build/Build";
import Product from "./Component/view/Product/product_page";
import Login from "./Component/view/LoginAndSignUp/Login";
import Signup from "./Component/view/LoginAndSignUp/SignUp";
import Home from "./../src/Component/view/HomePage/Home"
import AuthContextProvider from "./Component/Context/AuthContext";
import PreBuildContextProvider from "./Component/Context/PreBuildContext";

function App() {

  return (
    <div className="App" style={{ height: "100%" }}>
      <AuthContextProvider>
        <Navbar/>
      </AuthContextProvider>
      <Route path="/" exact component={Home}/>
      <Route path="/Blog" component={Blog} />
      <Route path="/donate" component={Donate} />
      <Route path="/build" component={Build} />
      <PreBuildContextProvider>
        <Route path="/product_page" component={Product} />
      </PreBuildContextProvider>
      <Route path="/Login" component={Login} />
      <Route path="/SignUp" component={Signup} />
    </div>
  );
}

export default App;
