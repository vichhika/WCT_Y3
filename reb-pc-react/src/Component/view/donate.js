import React from "react";

function Donate() {
  return (
    <div class="jumbotron jumbotron-fluid d-flex align-content-center my-0">
    <div class="container  my-auto content">
      
      <p>
        
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Donate us
        </button>
      </p>
      <div class="collapse " id="collapseExample">
        <div class="card card-body ">
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