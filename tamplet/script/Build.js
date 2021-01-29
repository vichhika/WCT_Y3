var mybuild = [];

$(document).ready(function(){
    displayShop()
    
})


<<<<<<< HEAD
function add(Comp,Model,Price){
    /*declare object to hold the data info*/
    var component = {comp:"",model:"",price:""}
        component.comp = Comp; component.model = Model; component.price = Price;
    /*push data into a list of their build component*/
    mybuild.push(component);
    /*push list of mybuild into sessionStorage*/    
    sessionStorage.setItem("myBuild",JSON.stringify(mybuild));
}

function displayCon(){
    
=======
//by leang
let currentConponent = {'shop':null , 'name':null,'setCon':null}
let displayShop = () =>{
    $('#tableTitle').append('<th scope="col">Shop</th><th scope="col">Facebook</th><th scope="col"></th>')
>>>>>>> main
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        for(con in data) {
            $('#pcConponent').append(
<<<<<<< HEAD
                '<tr id='+con.id+'>'+
                    "<th><span>"+currentConponent.name+"</span></th>"+
                    '<td><span id="">'+con.product+'</span></td>'+
                    '<td><span id="">'+con.price+'</span></td>'+
                    `<td><button id=${"addBtn"+con.id} class="btn btn-primary px-5" type="button" onclick="add('${currentConponent.name}','${con.product}','${con.price}')">Add</button></td>`+
=======
                '<tr id='+con+'>'+
                    '<th><span>'+con+'</span></th>'+
                    '<th><span>Facebook</span></th>'+
                    '<td><button class="btn btn-primary px-5 addShop" onClick="shopMenu(this)" type="submit">chose</button></td>'+
>>>>>>> main
                '</tr>'
            )
        }
    })
}

//by leang
let shopMenu = (me) => {
    let shopName = $(me).parent().parent().attr('id')
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        switch (shopName){
            case 'Chantra' : {currentConponent.shop = data.Chantra}  break
            case 'GoldOne': {currentConponent.shop = data.GoldOne}  break
            case 'Vtech' : {currentConponent.shop = data.Vtech}  break
            case 'TK': {currentConponent.shop = data.TK}  break
        }
    })
}

//by leang
$(".btnNextShop").click((me) => {
    $(me.target).removeClass("btnNextShop").addClass("btnNext")
    displayCon();
})


//improve code by leang
$(".btnNext").click(displayCon = () => {
    $('#pcConponent').empty();
    switch(currentConponent.name){
    default : {currentConponent.name = "CPU",currentConponent.setCon = currentConponent.shop.cpu}  break
    case 'CPU' : {currentConponent.name = "RAM",currentConponent.setCon = currentConponent.shop.ram} break
    case 'RAM' : {currentConponent.name = "Storage",currentConponent.setCon = currentConponent.shop.harddisk} break
    }
    $('#conponentTitle').text(currentConponent.name);
    for(con of currentConponent.setCon) {
        $('#pcConponent').append(
            '<tr id='+con.id+'>'+
                "<th><span>"+currentConponent.name+"</span></th>"+
                '<td><span>'+con.product+'</span></td>'+
                '<td><span>'+con.price+'</span></td>'+
                '<td><button class="btn btn-primary px-5 addBtn" type="submit">Add</button></td>'+
            '</tr>'
        )
    }
});