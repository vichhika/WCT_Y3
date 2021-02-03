import logo from './logo.svg';
import './App.css';
import Jumbotron from './Component/view/jumbotron.js';
import Navbar from "./Component/view/navbar.js";

function App() {
  return (
    <div className="App" style={{height: "100%"}}>
      < Navbar />
      < Jumbotron />
      
    </div>
  );
}

export default App;
