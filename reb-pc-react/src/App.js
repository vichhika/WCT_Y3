import logo from "./logo.svg";
import "./App.css";
import Jumbotron from "./Component/view/jumbotron.js";
import Navbar from "./Component/view/navbar.js";
import { Route, Switch } from "react-router-dom";
import AboutUs from "./Component/view/aboutUs";
import Donate from "./Component/view/donate";
import Build from "./Component/view/Build/Build";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Navbar />
      <div  style={{ height: "100%" }}>
        <Route path="/" exact component={Jumbotron} />
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/donate" component={Donate} />
        <Route path="/build" component={Build} />
      </div>
    </div>
  );
}

export default App;
