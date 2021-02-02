function count(num){
    console.log(num.toString(10).length)
}
//ngoun mengleang

count(1234567)

function diffText(a,b){
    let tmp = "";
    for (tmpChar of b){
        if(!a.includes(tmpChar)){
            tmp = tmp + tmpChar
        }
    }
    console.log(tmp);
}
//ngoun mengleang
diffText("abcd", "abef")

function Print(y){
    for(let i = 0 ; i < y ; i++){
        let tmp = '';
        for(let j = 0 ; j < y ; j++){
            if(j === 0 || j+1 === y || j === i ){
                tmp += 'x '
            }else{
                tmp += 'o '
            }
        }
        console.log(tmp);
    }
}
//ngoun mengleang
Print(7)



