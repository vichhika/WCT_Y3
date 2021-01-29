// variable to store data receive from sessionStorage
var myBuild = JSON.parse(sessionStorage.getItem("myBuild"));
var total = 0;
$(document).ready(() => {
    displayRes();
    estimate();
});

/*Display Result Function*/
function displayRes(){
    console.log(myBuild);
    addResToTable();
}

/*Add data to table result*/
function addResToTable(){
    myBuild.map(c => {
        $("#resCom").append(
            `<tr>
                <td>${c.comp}</td>
                <td>${c.model}</td>
                <td>${c.price}</td>
                <td>${c.unit}</td>
            </tr>`
        )
        /*calculate the price*/
        let price = c.price.replace('$','').replace(',','');
        calculateTotalPrice(parseFloat(price),parseFloat(c.unit));
    })

    /*display Total price*/
    $("#resCom").append(
        `<tr>
            <td></td>
            <td></td>
            <td><b>Total<b></td>
            <td>${"$"+total}</td>
        </tr>`
    )
}

function estimate(){
    // <tr class="anotherShop">
    //           <th scope="row">1</th>
    //           <td>Vtech</td>
    //           <td>$1000</td>
    //           <td>+ $10</td>
    //         </tr>
    $.getJSON( "./../../Data/Chantra.json" , (data) => {  
        for ( shop in data){
            console.log(shop,data[shop]);
        }
    })
}

/*Calculate Total Price Function*/
function calculateTotalPrice(price,unit){
    total += price * unit;
}