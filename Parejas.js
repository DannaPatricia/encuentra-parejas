let tableroCartas = new Array(4);
let imagenesCartas = new Array(12);
let cartasElegidas = new Array(2);
let turnos = 0;

window.onload = function () {
    iniciarJuego();
}

function iniciarJuego() {
    crearCartas();
    prepararCartas();
    darCarta();
}

function crearCartas() {
    for (var i = 0; i < tableroCartas.length; i++) {
        tableroCartas[i] = new Array(6);
    }
    const contenedorCartas = document.getElementById("contenedor");
    var contador = 0;
    for (var i = 0; i < tableroCartas.length; i++) {
        for (var j = 0; j < tableroCartas[0].length; j++) {
            var cartaNueva = document.createElement("div");
            cartaNueva.setAttribute("class", "cartas");
            cartaNueva.setAttribute("id", contador);
            tableroCartas[i][j] = cartaNueva;
            contenedorCartas.appendChild(cartaNueva);
            contador++;
        }
    }
    for (var i = 0; i < imagenesCartas.length; i++) {
        imagenesCartas[i] = "url('../imagenes/" + (i + 1) + ".png')";
    }
}

function prepararCartas() {
    for (var i = 0; i < tableroCartas.length; i++) {
        for (var j = 0; j < tableroCartas[0].length; j++) {
            do {
                var nAleatorio = Math.floor(Math.random() * 12);
            } while (!compruebaRepetida(imagenesCartas[nAleatorio]));
            tableroCartas[i][j].dataset.id = imagenesCartas[nAleatorio];
            tableroCartas[i][j].dataset.dado = "false";
        }
    }
}

function compruebaRepetida(imagenCarta) {
    var contador = 0;
    for (var i = 0; i < tableroCartas.length; i++) {
        for (var j = 0; j < tableroCartas[0].length; j++) {
            if (tableroCartas[i][j].dataset.id === imagenCarta) {
                contador++;
            }
            if (contador === 2) {
                return false;
            }
        }
    }
    return true;
}

function darCarta() {
    let imagenCarta = "";
    const cartas = document.querySelectorAll(".cartas");
    cartas.forEach(carta => {
        carta.addEventListener("click", () => {
            if (carta.dataset.dado === "false" && turnos <= 2) {
                carta.dataset.dado = "true";
                carta.style.transition = "opacity 0.5s";
                carta.style.opacity = "0";
                setTimeout(() => {
                    imagenCarta = carta.dataset.id;
                    carta.style.backgroundImage = imagenCarta;
                    carta.style.opacity = "1";
                }, 300);
                cartasElegidas[turnos] = carta;
                turnos++;
                compruebaPareja();
                reiniciarJuego();
            }
        });
    });
}

function compruebaPareja() {
    if (turnos == 2) {
        console.log(cartasElegidas[0]);
        console.log(cartasElegidas[1]);
        let carta1 = cartasElegidas[0];
        let carta2 = cartasElegidas[1];
        if (carta1.dataset.id != carta2.dataset.id) {
            carta1.dataset.dado = "false";
            carta2.dataset.dado = "false";
            ocultarCarta(carta1, carta2);
        }
        turnos = 0;
        arrayCartas2 = new Array(2);
    }
}

function ocultarCarta(carta1, carta2) {
    setTimeout(() => {
        carta1.style.transition = "opacity 0.5s";
        carta1.style.opacity = "0";
        carta2.style.transition = "opacity 0.5s";
        carta2.style.opacity = "0";
        setTimeout(() => {
            carta1.style.backgroundImage = "none";
            carta2.style.backgroundImage = "none";
            carta1.style.backgroundColor = " rgb(91, 128, 193)";
            carta2.style.backgroundColor = " rgb(91, 128, 193)";
            carta1.style.opacity = "1";
            carta2.style.opacity = "1";
        }, 300);
    }, 1000);
}

function reiniciarJuego() {
    let cartasContadas = 0;
    let totalCartas = tableroCartas.length * tableroCartas[0].length;
    for (var i = 0; i < tableroCartas.length; i++) {
        for (var j = 0; j < tableroCartas[0].length; j++) {
            let carta = tableroCartas[i][j];
            if (carta.dataset.dado === "true") {
                cartasContadas++;
            }
            if (cartasContadas == totalCartas) {
                girarCartas();
                tableroCartas = new Array(4);
                iniciarJuego();
            }
        }
    }
}

function girarCartas() {
    for (var i = 0; i < tableroCartas.length; i++) {
        for (var j = 0; j < tableroCartas[0].length; j++) {
            tableroCartas[i][j].style.backgroundImage = "none";
            tableroCartas[i][j].style.backgroundColor = " rgb(91, 128, 193)";
        }
    }

}



