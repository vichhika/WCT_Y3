import React from "react"
import Item from "./Item"
export default function ItemList() {
    return (
        
        <table class="table table-hover mt-5">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Model</th>
              <th>Price</th>
              <th></th>
            </tr>

            <Item/>
            <Item/>
            <Item/>
            

            
        
        </table>
        
    );
}

