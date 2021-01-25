$(document).ready(function(){
        cpu(); 
})

function cpu(){
    
    $.getJSON( "./../../Data/Chantra.json", (data) => {
        for(cpu of data.cpu) {
            $('#pcConponent').append(
                '<tr id='+cpu.id+'>'+
                    "<th><span>CPU</span></th>"+
                    '<td><span id="">'+cpu.product+'</span></td>'+
                    '<td><span id="">'+cpu.price+'</span></td>'+
                    '<td><button class="btn btn-primary btn-sm px-4" type="submit">Add</button></td>'+
                '</tr>'
            )
        }
    })
}