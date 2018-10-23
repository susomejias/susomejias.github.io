/**

Un botón "bajar línea" para bajar una línea.
Un botón "subir línea" para subir una línea
Un botón "bajar" para bajar una página.
Un botón "subir" para subir una página.
Un botón "inicio" para ir al inicio del documento
Un botón "fin" para ir al final del documento.
Puedes utilizar los siguientes métodos de windows: scroll(), scrollBy(), scrollByLines(), scrollTo()

@author Jesús Mejias Leiva
*/

{

    let downLine;
    let upLine;
    let downPage;
    let upPage;
    let startDocument;
    let endDocument;

    function init(){


        //downLine = document.getElementById("downLine"); 
        //upLine = document.getElementById("upLine");
        downPage = document.getElementById("downPage");
        upPage = document.getElementById("upPage");
        startDocument = document.getElementById("startDocument");
        endDocument = document.getElementById("endDocument");

        //la función scrollByLines no es soportada por todos los navegadores
        //downLine.addEventListener("click", () => { scrollByLines(1) }); 
        //upLine.addEventListener("click", () => { scrollByLines(-1) });

        downPage.addEventListener("click", () => { window.scroll(0, window.scrollY + window.innerHeight) });
        upPage.addEventListener("click", () => { window.scroll(0, window.scrollY - window.innerHeight) });
        startDocument.addEventListener("click", () => { window.scrollTo(0,0) });
        endDocument.addEventListener("click", () => { window.scrollTo(0,document.body.clientHeight) });


    }

    window.addEventListener("load", init);

}