/**
Completar el código JavaScript proporcionado para que:

1.Al mover el ratón en cualquier punto de la ventana del navegador, se muestre la posición del puntero respecto del navegador y respecto de la página:

2.Al pulsar cualquier tecla, el mensaje mostrado debe cambiar para indicar el nuevo evento y su información asociada: 

3.Añadir la siguiente característica al script: cuando se pulsa un botón del ratón, el color de fondo del cuadro de mensaje debe ser amarillo (#FFFFCC) y cuando se pulsa una tecla, el color de fondo debe ser azul (#CCE6FF). Al volver a mover el ratón, el color de fondo vuelve a ser blanco.

Autor: Jesús Mejias Leiva

*/

{
    let info;

    function init() {
        
        info = document.getElementById("info");

        document.addEventListener("mousemove", function(ev){

            // console.log(ev.pageX);
            // console.log(ev.pageY);
            actualizarInfoRaton(ev.pageX,ev.pageY);

        });

        document.addEventListener("keypress", function(ev){

            // console.log(ev.key);
            // console.log(ev.charCode);
            actualizarInfoTeclado(ev.key,ev.charCode);

        });


    }

    let actualizarInfoRaton = function (x, y) {
        
        info.innerHTML = "<h2>Ratón</h2><p>Navegador " + "[" + x + ", " + y + "]" + "</p>";
        info.style.background = "#FFFFCC";

    }

    let actualizarInfoTeclado = function (caracter, codigo) {
        
        info.innerHTML = "<h2>Teclado</h2>" +
                        "<p>Carácter [" + caracter + "]" + "</p>" +
                        "<p>Código [" + codigo + "] </p>";

        info.style.background = "#CCE6FF";


    }

    window.addEventListener("load", init);

}