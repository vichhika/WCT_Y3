function clickBtnMenu(){
    let menu = document.getElementById("mnu").style.display;
    if (menu == 0 || menu ==='none')
        document.getElementById("mnu").style.display = 'block';
    else if (menu === 'block')
        document.getElementById("mnu").style.display = 'none';
}