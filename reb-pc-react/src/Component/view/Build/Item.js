import React, { useContext, useEffect } from 'react'
import { buildContext } from "./../../Context/BuildContext"

export default function Item(props) {

  return (

    <tr style={{ verticalAlign: "middle" }}>
      <td>
        <img
          src="http://www.goldonecomputer.com/image/catalog/products/Motherboards/ASUS/Asus Strix B450F - Gaming.jpg"
          width="50px"
          height="50px"
        />
      </td>
      <td width="50%">
        {props.itemDetail.brand}
      </td>
      <td>{props.itemDetail.model}</td>
      <td>{props.itemDetail.price}</td>
      <td>
        <button type="button" class="btn btn-light" style={{ padding: "0" }}>
        Add</button>
      </td>
    </tr>



  );
}

