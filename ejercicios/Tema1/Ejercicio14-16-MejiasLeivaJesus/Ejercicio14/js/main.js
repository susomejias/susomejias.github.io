/**

A partir de la página web proporcionada, completar el código JavaScript para que:

Cuando se pinche sobre el primer enlace, se oculte su sección relacionada
Cuando se vuelva a pinchar sobre el mismo enlace, se muestre otra vez esa sección de contenidos
Completar el resto de enlaces de la página para que su comportamiento sea idéntico al del
primer enlace
Cuando una sección se oculte, debe cambiar el mensaje del enlace asociado (pista: propiedad innerHTML)

Autor: Jesús Meias Leiva

*/
{
    let contenidoUno,
        enlaceUno,
        contenidoDos,
        enlaceDos,
        contenidoTres,
        enlaceTres;

    function init(){

        contenidoUno = document.getElementById("contenidos_1");
        enlaceUno = document.getElementById("enlace_1");

        contenidoDos = document.getElementById("contenidos_2");
        enlaceDos = document.getElementById("enlace_2");

        contenidoTres = document.getElementById("contenidos_3");
        enlaceTres = document.getElementById("enlace_3");

        // ponemos los elementos tipo bloque
        contenidoUno.style.display = "block";
        contenidoDos.style.display = "block";
        contenidoTres.style.display = "block";


        enlaceUno.addEventListener("click", function(ev){

            ev.preventDefault;
            ocultarMostrarContenido(contenidoUno, this);


            //console.log(contenidoUno.style.display);
    
        });
        

        enlaceDos.addEventListener("click", function(ev){

            ev.preventDefault;
            ocultarMostrarContenido(contenidoDos, this);
    
        });

        enlaceTres.addEventListener("click", function(ev){

            ev.preventDefault;
            ocultarMostrarContenido(contenidoTres, this);
    
        });

    }


    let ocultarMostrarContenido = function(contenido, enlace){


            if (contenido.style.display === "block"){
                contenido.style.display = "none";
                enlace.textContent = "Mostrar más";
            }else {
                contenido.style.display = "block";
                enlace.textContent = "Ocultar contenidos";
            }
    
    }



    window.addEventListener("load", init);

}