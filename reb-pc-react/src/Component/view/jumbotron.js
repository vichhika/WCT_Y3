import React from "react";


function Jumbotron() {
  return (
    <div className="jumbotron jumbotron-fluid d-flex align-content-center my-0">
      <div className="container  my-auto content">
        <h1 className="mb-4 ">
          <b>Welcome !</b>
        </h1>
        <p className="lead mb-4">
          Reab PC is a platform that provide a user more easier to build 
          PC,<br/>estimate price, and PC shop recommandation.
        </p>
        <div className="mb-4">
          <button
            id="startBtn"
            type="button m-5"
            className="btn btn-primary btn-sm my-2 px-4 py-2"
          >
            Start Build
          </button>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;