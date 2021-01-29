$(document).ready(function(){
    displayShop()
    
})


//by leang
let currentConponent = {'shop':null , 'name':null,'setCon':null}
let displayShop = () =>{
    $('#tableTitle').append('<th scope="col">Shop</th><th scope="col">Facebook</th><th scope="col"></th>')
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        for(con in data) {
            $('#pcConponent').append(
                '<tr id='+con+'>'+
                    '<th><span>'+con+'</span></th>'+
                    '<th><span>Facebook</span></th>'+
                    '<td><button class="btn btn-primary px-5 addShop" onClick="shopMenu(this)" type="submit">chose</button></td>'+
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