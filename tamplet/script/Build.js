var mybuild = [];
var randId = 0;
var shop = "chantra";
$(document).ready(function(){
    displayShop()
})

//by leang
let currentConponent = {'shop':null , 'name':null,'setCon':null}
let displayShop = () =>{
    $('#title').append('Choose Shop that you going to build');
    $('#tableTitle').append('<th scope="col">Shop</th><th scope="col">Facebook</th><th scope="col"></th>')
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        for(con in data) {
            $('#pcConponent').append(
                '<tr id='+con+'>'+
                    '<td><span>'+con+'</span></td>'+
                    '<td><span>Facebook</span></td>'+
                    '<td><button class="btn btn-primary px-5 addShop" onClick="shopMenu(this)" type="button">choose</button></td>'+
                '</tr>'
            )
        }
    })
}

//by leang
let shopMenu = (me) => {
    let shopName = $(me).parent().parent().attr('id');
    shop = shopName;
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        switch (shopName){
            case 'chantra' : {currentConponent.shop = data.chantra}  break
            case 'goldone': {currentConponent.shop = data.goldone}  break
            case 'vtech' : {currentConponent.shop = data.vtech}  break
            case 'tk': {currentConponent.shop = data.tk}  break
        }
    })
}

//by leang
$(".btnNextShop").click((me) => {
    $(me.target).removeClass("btnNextShop").addClass("btnNext")
    $('#title').empty();
    $('#title').append('Choose your <span id="conponentTitle"></span>  want to build');
    $('#tableTitle').empty();
    $('#tableTitle').append('<th scope="col">Conponent</th><th scope="col">Model</th><th scope="col">Price</th><th scope="col"></th><th scope="col">Unit</th><th scope="col"></th>');
    displayCon();
})

//improve code by leang
$(".btnNext").click(displayCon = () => {
    window.scrollTo(0,0)
    $('#pcConponent').empty();
    switch(currentConponent.name){
    default : {currentConponent.name = "CPU",currentConponent.setCon = currentConponent.shop.cpu}  break
    case 'CPU' : {currentConponent.name = "RAM",currentConponent.setCon = currentConponent.shop.ram} break
    case 'RAM' : {currentConponent.name = "Storage",currentConponent.setCon = currentConponent.shop.harddisk} break
    case 'Storage' : {currentConponent.name = "motherboard",currentConponent.setCon = currentConponent.shop.motherboard} break
    case 'motherboard' : {currentConponent.name = "power",currentConponent.setCon = currentConponent.shop.power} break
    case 'power' : {currentConponent.name = "case",currentConponent.setCon = currentConponent.shop.case} break
    case 'case' : {currentConponent.name = "vga",currentConponent.setCon = currentConponent.shop.vga} break
    case 'vga' : window.location.href = "/tamplet/html/resultPage.html"; break
    }
    $('#conponentTitle').text(currentConponent.name);
    for(con of currentConponent.setCon) {
        $('#pcConponent').append(
            '<tr id='+con.id+'>'+
                "<th><span>"+currentConponent.name+"</span></th>"+
                '<td><span>'+con.product+'</span></td>'+
                '<td><span>'+con.price+'</span></td>'+
                `<td><button id=${"addBtn"+currentConponent.name+"_"+con.id} class="btn btn-outline-light rounded" style="border:none" type="button" onclick="add('${currentConponent.name+con.id}',shop,'${currentConponent.name}','${con.product}','${con.price}','${"unit"+currentConponent.name+con.id}')"><i class="far fa-plus"></i></button></td>`+
                `<td id="${"unit"+currentConponent.name+con.id}">0</td>`+           
                `<td><button id=${"RmBtn"+currentConponent.name+"_"+con.id} class="btn btn-outline-light rounded" style="border:none" type="button" onclick="remove('${currentConponent.name+con.id}','${"unit"+currentConponent.name+con.id}')"><i class="far fa-minus"></i></button></td>`+
            '</tr>'
        )
        randId++;
    }
});

function add(id,shop,Comp,Model,Price,unitID){
    let storage = JSON.parse(sessionStorage.getItem("myBuild"));
    console.log("add:" + Comp);
    if (storage !== null && storage.find(comp => comp.id === id) !== undefined){
        let idx = storage.indexOf(storage.find(comp => comp.id === id));
        storage[idx].unit = storage[idx].unit + 1;
        sessionStorage.setItem("myBuild",JSON.stringify(storage));
        $("#"+unitID).html(storage[idx].unit);
        mybuild = storage;
    }else{
        /*declare object to hold the data info*/
        var component = {id:"",shop:"",comp:"",model:"",price:"",unit:"0"}
        component.id = id; component.shop = shop; component.comp = Comp; component.model = Model; component.price = Price; component.unit = parseFloat(component.unit) + 1;

        /*push data into a list of their build component*/
        mybuild.push(component);

        /*push list of mybuild into sessionStorage*/    
        sessionStorage.setItem("myBuild",JSON.stringify(mybuild));

        /*update unit value on display unit*/
        $("#"+unitID).html(component.unit);
    }
    console.log(shop);
}

function remove(id,unitID){
    let storage = JSON.parse(sessionStorage.getItem("myBuild"));
        if (storage.length != 0 && storage[id].unit != 0){
            /*Decrement unit*/
            storage[id].unit = storage[id].unit - 1;
            /*update unit value on display unit*/
            $("#"+unitID).html(storage[id].unit);
            if (storage[id].unit == 0){
                storage.splice(id,1);
                mybuild = storage;
            }
            sessionStorage.setItem("myBuild",JSON.stringify(storage));
        }
 }


