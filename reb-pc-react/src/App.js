
import "./App.css";
import Jumbotron from "./Component/view/jumbotron.js";
import Navbar from "./Component/view/navbar.js";
import { Route } from "react-router-dom";
import Blog from "./Component/view/Blog";
import Donate from "./Component/view/donate";
import Build from "./Component/view/Build/Build";
import Product from "./Component/view/product";
import Login from "./Component/view/LoginAndSignUp/Login";
import Signup from "./Component/view/LoginAndSignUp/SignUp";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Navbar />
      <div  style={{ height: "100%" }}>
        <Route path="/" exact component={Jumbotron} />
        <Route path="/Blog" component={Blog} />
        <Route path="/donate" component={Donate} />
        <Route path="/build" component={Build} />
        <Route path="/product" component={Product} />
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={Signup} />

      </div>
    </div>
  );
}

export default App;
