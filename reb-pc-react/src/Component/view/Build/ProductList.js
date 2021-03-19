import React from "react"
import ListSize from "./ListSize"
import ListControl from"./ListControl"
import ItemList from"./ItemList"
function ProductList() {
    return (
        <div class="card mt-5">
            <div class="card-header">
                <h6 id="step_title">CPU</h6>
            </div>

            <div class="card-body">
                <div class="filter-bar d-flex">
                    <ListSize />
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                           
                        <button class="btn btn-light" type="button">
                            <i class="far fa-search"></i>
                        </button>
                    </form>
                </div>

                <div>
                    <ItemList/>

                </div>

                <div class="below-bar d-flex">
                    <div class="product_qty_instock d-flex justify-content-center">
                        <p class="mb-0">Showing 1 to 5 of 35 entries</p>
                    </div>
                    <ListControl />
                </div>

            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-secondary">back</button>
                <button type="button" class="btn btn-success">Next</button>
            </div>

        </div>
    );
}
export default ProductList;