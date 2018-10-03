/**

A partir de la página web proporcionada y utilizando las funciones DOM, mostrar por pantalla la siguiente información:
1. Número de enlaces de la página
2. Dirección a la que enlaza el penúltimo enlace
3. Numero de enlaces que enlazan a http://prueba
4. Número de enlaces del tercer párrafo

Autor: Jesús Mejias Leiva
 */

{

    let enlaces;
    let mostrarResultado;

    function init() {

        enlaces = document.getElementsByTagName("a");
        mostrarResultado = document.getElementById("resultado");



        // llamada funciones

        mostrarResultado.innerHTML = "<h1> Resultado </h1>"
                                    +
                                    "<p>Numero de enlaces de la página: " + numeroEnlaces() + "</p>"+
                                    "<p>Dirección a la que enlaza el penúltimo enlace: " + direccionPenultimoEnlace() + "</p>"
                                    +
                                    "<p>Numero de enlaces que enlazan a http://prueba: " + numeroEnlacesAPrueba() + "</p>"
                                    +
                                    "<p>Número de enlaces del tercer párrafo: " + enlacesTercerParrafo() + "</p>"
                                    ;

        // console.log(numeroEnlaces());
        // console.log(direccionPenultimoEnlace());
        // console.log(numeroEnlacesAPrueba());
        // console.log(enlacesTercerParrafo());

    }


    let numeroEnlaces = function () {


        return enlaces.length;

    }

    let direccionPenultimoEnlace = function () {
        
        let penultimoEnlace = enlaces[enlaces.length -2];

        let direccion = penultimoEnlace.getAttribute("href");

        return direccion;

    }

    let numeroEnlacesAPrueba = function () {

        let enlacesAprueba = [];

        for (let i = 0; i < enlaces.length; i++) {
            //console.log(enlaces[i]);

            if (enlaces[i].getAttribute("href") === "http://prueba"){
            
                enlacesAprueba.push(enlaces[i]);

            }

        }

        return enlacesAprueba.length;


    }


    let enlacesTercerParrafo = function () {

        let parrafos = document.getElementsByTagName("p");

        let tercerParrafo = parrafos[2];

        let enlacesParrafo = tercerParrafo.getElementsByTagName("a");


        return enlacesParrafo.length;
        

    }

    

    window.onload = init;

}