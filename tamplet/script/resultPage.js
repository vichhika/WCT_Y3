// variable to store data receive from sessionStorage
var myBuild = JSON.parse(sessionStorage.getItem("myBuild"));
var total = 0;
$(document).ready(() => {
    displayRes();
    estimate();
});

/*Display Result Function*/
function displayRes(){
    //console.log(myBuild);
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
    
    $.getJSON( "./../../Data/Chantra.json" , (data) => {  
        let shopName = myBuild[1].shop;
        for ( shop in data){ 
            
            if(shop !== shopName){
                let alterTotalPrice = 0 ;
                for( me of myBuild){
                    
                    switch (me.comp){
                        case 'CPU' :        {alterTotalPrice += data[shop].cpu[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'RAM' :        {alterTotalPrice += data[shop].ram[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'Storage' :    {alterTotalPrice += data[shop].harddisk[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'motherboard' :{alterTotalPrice += data[shop].motherboard[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'power' :      {alterTotalPrice += data[shop].power[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'case' :       {alterTotalPrice += data[shop].case[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        case 'vga' :        {alterTotalPrice += data[shop].vga[me.id.split('_')[1]].price.replace('$','')*me.unit} break;
                        
                    }
                }
                let saving = alterTotalPrice - total;
                $('.alterShop').append('<tr class="anotherShop">'+
                '<td>'+shop+'</td>'+
                '<td>'+'$'+alterTotalPrice+'</td>'+
                '<td>'+saving+'</td>'+
                ' </tr> ')
            }

        }
    })
}

/*Calculate Total Price Function*/
function calculateTotalPrice(price,unit){
    total += price * unit;
}