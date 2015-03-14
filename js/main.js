/*
x();
function x(){
    addEventListener('load', start);
    function start(){
        var find-someone = document.querySelector("#find-someone");
        find-someone.addEventListener('click', find);
    }
    function find(event){
        window.location = "findSomeone.html";
    }
}
*/

function change(newLocation){
    location.replace(newLocation);
}