/**

Muestra en  una lista la siguiente información. Cada uno de las etiquetas <ol> y <li> han de crearse mediante los métodos de document. Explica en cada uno la diferencia con respecto a los demás.

window.outerHeight
window.innerHeight
window.screen.availHeight
window.screen.height
window.document.clientHeight

@author Jesús Mejias Leiva

*/

{

    let main;

    function init (){

        main = document.getElementById("main");

        functionality();
        
    }

    let functionality = function (){

        

        let ul = document.createElement("ul");
        
        let propertie = {};

        let properties = [

            {propertie : window.outerHeight , description: "window.outerHeight", usage: "obtiene la altura en pixeles de toda la ventana del navegador" },
            {propertie : window.innerHeight , description: "window.innerHeight", usage: "Altura (en píxeles) de la ventana de visualización del navegador que incluye, si está renderizada, la barra de desplazamiento horizontal" },
            {propertie : window.screen.availHeight, description: "window.screen.availHeight", usage: "Devuelve el espacio total vertical disponible en la pantalla" },
            {propertie : window.screen.height , description: "window.screen.height", usage: "Devuelve la altura en pixeles de la pantalla" },
            {propertie : "0" , description: "window.document.clientHeight", usage: "La opción se encuentra deprecated" }
            
        ];

        let fragment = document.createDocumentFragment();


        
        for (let i = 0; i < properties.length; i++) {

            let li = document.createElement("li");
            li.innerHTML = "<b>" +properties[i].description + "</b>: " + "<span class=\"result\">" + properties[i].propertie + "px, </span>" + properties[i].usage + ".";
            fragment.appendChild(li);
        
        }

        ul.appendChild(fragment);

        main.appendChild(ul);



    }

    window.addEventListener("load", init);

}