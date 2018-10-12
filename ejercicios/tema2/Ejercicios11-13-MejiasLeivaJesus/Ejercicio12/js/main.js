/**

Completar el código JavaScript proporcionado para que cuando se pinche sobre el enlace se muestre completo el contenido de texto. Además, el enlace debe dejar de mostrarse después de pulsarlo por primera vez. La acción de pinchar sobre un enlace forma parte de los "Eventos" de JavaScript que se ven en el siguiente capítulo. En este ejercicio, sólo se debe saber que al pinchar sobre el enlace, se ejecuta la función llamada muestra().

Autor: Jesús Mejias Leiva
 */

{

    let mas;
    let enlaceLeerMas;

    function init() {

        mas = document.getElementById("mas");
        enlaceLeerMas = document.getElementById("leerMas");

        // llamada funciones

        mostrarMas();
        
    }

    let mostrarMas = function () {


        mas.style.display = "none";

        enlaceLeerMas.addEventListener("click", function(ev){

            ev.preventDefault;

            mas.style.display = "inline";

            this.style.display = "none";

        });


    }

    window.onload = init;

}