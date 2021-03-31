import React from "react"

export default function ItemList() {
    return (
        
            <tr style={{ verticalAlign: "middle"}}>
              <td>
                <img
                  src="http://www.goldonecomputer.com/image/catalog/products/Motherboards/ASUS/Asus Strix B450F - Gaming.jpg"
                  width="50px"
                  height="50px"
                />
              </td>
              <td width="50%">
                Asus Strix B450F - Gaming (Socket AM4 / 4xDDR4 Slots / M.2
                slotx2 / USB 3.1)
              </td>
              <td>Strix B450F - Gaming</td>
              <td>$125.00</td>
              <td>
                <button type="button" class="btn btn-light" style={{ padding: "0"}}>
                  <i class="far fa-plus" style={{ color: "#0d6efd"}}></i>
                </button>
              </td>
            </tr>
            
        
        
    );
}

