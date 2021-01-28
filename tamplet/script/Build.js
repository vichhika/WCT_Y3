$(document).ready(function(){
    displayCon(); 
})

function displayCon(){
    
    $.getJSON( "./../../Data/Chantra.json", (data) => {
        //$('#conponentTitle').text(data)
        for(con of data.cpu) {
            $('#pcConponent').append(
                '<tr id='+con.id+'>'+
                    "<th><span>"+con+"</span></th>"+
                    '<td><span id="">'+con.product+'</span></td>'+
                    '<td><span id="">'+con.price+'</span></td>'+
                    '<td><button class="btn btn-primary px-5" type="submit">Add</button></td>'+
                '</tr>'
            )
        }
    })
}