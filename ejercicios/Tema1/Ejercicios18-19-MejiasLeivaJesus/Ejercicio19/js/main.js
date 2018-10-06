/**
Mejorar el tooltip propuesto añadiendo las siguientes características:

    1.Que el tooltip no se muestre instantáneamente, sino que transcurra un cuarto de segundo hasta que se muestre (pista: DELAY)

    2.Que exista una separación horizontal de 15 píxel entre el puntero del ratón y el tooltip (pista: OFFSETX)

    3.Que el tooltip se muestre en la parte superior del puntero del ratón y no en la parte inferior (pista: ABOVE)

Autor: Jesús Mejias Leiva

 */

{


    let elemento;

    function init(){

        overlib_pagedefaults(WIDTH,150,FGCOLOR,'#000a12',BGCOLOR,'#000a12',TEXTFONT,"Arial, Helvetica, Verdana",TEXTSIZE,".8em", TEXTCOLOR, '#FFF', DELAY, 250 ,OFFSETX, 15);

        elemento = document.getElementById("elemento");

        elemento.addEventListener("mouseover" , muestraOverLib);

        elemento.addEventListener("mouseout", function(){

            return nd();

        } )


    }

    let muestraOverLib = function(){

        return overlib('Prueba de un tooltip básico y muy sencillo.', ABOVE);

    }

    window.addEventListener("load", init);

}
