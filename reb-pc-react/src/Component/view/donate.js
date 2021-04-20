import React from "react";
import ABA from './../../img/aba.png'
import './../../Css/donate.scss'
function Donate() {

  return (
    <div className="jumbotron jumbotron-fluid d-flex align-content-center my-0">
    <div className="container  my-auto content">
      
      <p>
        
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Donate us
        </button>
      </p>

      <div className="collapse " id="collapseExample">
        <div className="card card-body ">
            <img src={ABA}></img>
            <p>XXXXXXXXXXX</p>
            <p>Thank you</p>
        </div>
        </div>
      </div>
     
    </div>
  );
}

export default Donate;