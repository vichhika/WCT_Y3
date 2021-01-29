var mybuild = [];

$(document).ready(function(){
    displayCon(); 
})

function nextCon(){
    $('#pcConponent').empty();
    displayCon();
}

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
    
    $.getJSON( "./../../Data/Chantra.json", (data) => {  
        let currentConponent = {'name':"",'setCon':""}
         currentConponent.name =  $('#conponentTitle').text();
        switch(currentConponent.name){
            default : {currentConponent.name = "CPU",currentConponent.setCon = data.chantra.cpu}  break
            case 'CPU' : {currentConponent.name = "RAM",currentConponent.setCon = data.chantra.ram} break
            case 'RAM' : {currentConponent.name = "Harddisk",currentConponent.setCon = data.chantra.harddisk} break
        }
        $('#conponentTitle').text(currentConponent.name);
        for(con of currentConponent.setContype="submit") {
            $('#pcConponent').append(
                '<tr id='+con.id+'>'+
                    "<th><span>"+currentConponent.name+"</span></th>"+
                    '<td><span id="">'+con.product+'</span></td>'+
                    '<td><span id="">'+con.price+'</span></td>'+
                    `<td><button id=${"addBtn"+con.id} class="btn btn-primary px-5" type="button" onclick="add('${currentConponent.name}','${con.product}','${con.price}')">Add</button></td>`+
                '</tr>'
            )
        }
    })
}