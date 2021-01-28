$(document).ready(function(){
    displayCon(); 
})

function displayCon(){
    
    $.getJSON( "./../../Data/Chantra.json", (data) => {
        //$('#conponentTitle').text(data)
        for(con of data.cpu) {
            $('#pcConponent').append(
<<<<<<< HEAD
                '<tr id='+con.id+'>'+
                    "<th><span>"+con+"</span></th>"+
                    '<td><span id="">'+con.product+'</span></td>'+
                    '<td><span id="">'+con.price+'</span></td>'+
=======
                '<tr id='+cpu.id+'>'+
                    "<th><span>CPU</span></th>"+
                    '<td><span id="">'+cpu.product+'</span></td>'+
                    '<td><span id="">'+cpu.price+'</span></td>'+
>>>>>>> parent of 37002b0... edit some ui on build html
                    '<td><button class="btn btn-primary px-5" type="submit">Add</button></td>'+
                '</tr>'
            )
        }
    })
}