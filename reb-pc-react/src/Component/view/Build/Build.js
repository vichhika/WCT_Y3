import React from "react";
import "./../../../Css/build.scss";
import ProductList from "./ProductList";
import ProcessBar from "./ProcessBar";

function Build() {
  return (
    <div className="p-Build">
      <div class="container d-flex justify-content-center text-center">
        <h2 class="card-title mt-5">Build Custom PC</h2>
        <p class="card-text mt-3">
          Complete all the step below to successful build your own PC.
        </p>
        <ProcessBar />
        <ProductList />
      </div>
    </div>
  );
}
export default Build;
