$(document).ready(function(){
    displayCon(); 
})

function nextCon(){
    $('#pcConponent').empty();
    displayCon();
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
        for(con of currentConponent.setCon) {
            $('#pcConponent').append(
                '<tr id='+con.id+'>'+
                    "<th><span>"+currentConponent.name+"</span></th>"+
                    '<td><span id="">'+con.product+'</span></td>'+
                    '<td><span id="">'+con.price+'</span></td>'+
                    '<td><button class="btn btn-primary px-5" type="submit">Add</button></td>'+
                '</tr>'
            )
        }
    })
}