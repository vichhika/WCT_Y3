// variable to store data receive from sessionStorage
var myBuild = JSON.parse(sessionStorage.getItem("myBuild"));
var total = 0;
$(document).ready(() => {
    displayRes();
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
            </tr>`
        )
        /*calculate the price*/
        let price = c.price.replace('$','').replace(',','');
        calculateTotalPrice(parseFloat(price));
    })

    /*display Total price*/
    $("#resCom").append(
        `<tr>
            <td></td>
            <td><b>Total<b></td>
            <td>${"$"+total}</td>
        </tr>`
    )
}

/*Calculate Total Price Function*/
function calculateTotalPrice(price){
    total += price;
}