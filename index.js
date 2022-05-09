

function ComenzarJuego(){
    bloquearBotonStart();
    actualizarEstado("simon");
    bloquearImputUsuario();
    jugarSimon();
}

function siguenteRonda(){
    actualizarEstado("simon");
    bloquearImputUsuario();
    jugarSimon();
}

function bloquearBotonStart(){
    $botonStart.classList.add("disabled");
}

function desbloquearBotonStart(){
    $botonStart.classList.remove("disabled");
}

function actualizarEstado(option){
    
    let $displayEstado = document.querySelector("#estado");
    
    if(option === "simon"){
        $displayEstado.innerText = "Turno de simon";
    }else if(option === "jugador"){
        $displayEstado.innerText = "Turno del jugador";
    }else if(option === "perder"){
        $displayEstado.innerText = "Perdiste :(";
    }else if(option === "reset"){
        $displayEstado.innerText = "Presiona START para comernzar a jugar!";

    }
}

function bloquearImputUsuario(){

    const $cuadrosJuego = document.querySelectorAll(".cuadro-juego");

    $cuadrosJuego.forEach(element => {
        element.onclick = function(){

        }
    });

}

function jugarSimon(){

    const numeroRandom =  Math.floor(Math.random()*4)
    const $cuadrosJuego = document.querySelectorAll(".cuadro-juego");
    const $cuadroElegido = $cuadrosJuego[numeroRandom];

    coleccionSimon.push($cuadroElegido);

    coleccionSimon.forEach(function(element,index){

        setTimeout(() => {
            resaltarCuadro(element);
        }, 1000*index+1000);

    });
        
    

    setTimeout(() => {
        actualizarEstado("jugador");
        coleccionJugador = [];
        desbloquarImputUsuario();    
    }, coleccionSimon.length*1000 + 1000);
    

}

function resaltarCuadro(cuadro){

    cuadro.style.opacity = 1;

    setTimeout(() => {
        cuadro.style.opacity = 0.5;
    }, 500);


}

function desbloquarImputUsuario(){

    const $cuadrosJuego = document.querySelectorAll(".cuadro-juego");
    
    $cuadrosJuego.forEach(function (element){

        element.onclick = jugarJugador;

    });

}

function jugarJugador(evento){
    
    
    const $cuadroElegido = evento.target;
    coleccionJugador.push($cuadroElegido);
    
    bloquearImputUsuario();
    resaltarCuadro($cuadroElegido);
   
    //Queda hacer que no valide todo cada vez

    for (let index = 0; index < coleccionJugador.length; index++) {
        
        if(coleccionJugador[index] === coleccionSimon[index]){

            desbloquarImputUsuario();
            continue;

        }
        
        return perder()
    }

    if(coleccionJugador.length === coleccionSimon.length){
        setTimeout(() => {
            siguenteRonda();
        }, 1000);
        
    }

}

function perder(){
    bloquearImputUsuario();
    actualizarEstado("perder");
    coleccionJugador=[];
    coleccionSimon=[];
    
    setTimeout(() => {
        desbloquearBotonStart();
        actualizarEstado("reset");
    }, 1000);
    
}

let coleccionSimon = [];
let coleccionJugador = [];
const $botonStart = document.querySelector("[name=boton]");

$botonStart.onclick = function(){

    
    
    ComenzarJuego();

    



}