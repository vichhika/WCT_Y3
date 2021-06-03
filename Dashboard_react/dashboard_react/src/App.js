
import './App.css';
import Dashboard from './Component/view/dashboard'
import { Route, Switch} from "react-router-dom";
function App() {
  return (

    <div className="App" style={{height: "100%"}}>
    <Switch>
        <Route exact path="/">  <Dashboard/></Route>

        {/* <Route path="*"><PageNotfound/></Route> */}
    </Switch>
</div>


  
  )
}

export default App;
