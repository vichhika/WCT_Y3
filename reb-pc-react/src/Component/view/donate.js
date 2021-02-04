import React from "react";

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
            <img src="./../img/aba.png" style={{width:'265px;',height:'50%;'}}></img>
            <p>XXXXXXXXXXX</p>
            <p>Thank you</p>
        </div>
        </div>
      </div>
     
    </div>
  );
}

export default Donate;