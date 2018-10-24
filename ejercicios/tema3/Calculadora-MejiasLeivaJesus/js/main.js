/**
    Calculadora Js vanilla
    @author Jesús Mejias Leiva
*/

{

    let main;

    function init(){

        main = document.getElementsByTagName("main")[0];

        createLayout();

    }

    /**
        Función para crear el layout de la calculadora.
    */ 
    let createLayout = function () { 

        let fragment = document.createDocumentFragment();


        // crear container
        let containerDiv = document.createElement("div");
        addDiv(containerDiv, fragment , "container");

        // crear container-mostrar
        let showContainerDiv = document.createElement("div");
        addDiv(showContainerDiv, containerDiv, "show-container");

        // crear input para mostrar la salida
        let showInput = document.createElement("input");
        showInput.type = "text";
        showInput.value = 0;
        showContainerDiv.appendChild(showInput);

        // crear container-botones
        let buttonsContainerDiv = document.createElement("div");
        addDiv(buttonsContainerDiv, containerDiv, "buttons-container");

        // array con las clases ordenadas para recorrerlas
        let orderClasss = ["btnRed","btnOrange","btnOperation","btnOperation","btnPrincipal", "btnPrincipal","btnPrincipal","btnOperation","btnPrincipal","btnPrincipal", "btnPrincipal","btnOperation","btnPrincipal","btnPrincipal","btnPrincipal", "btnOperation","btnPrincipal","btnOperation","btnGrey","btnAccent"];

        // array con el texto que contendrán los botones, ordenado para recorrerlo
        let orderText = ["CE","DEL","%","+","7","8","9","-","4","5","6","x","1","2","3","/","0","+/-",",","="];


        for (let i = 0; i < orderClasss.length; i++) {

            // crea cada boton con su clase y su contenido
            createButton(buttonsContainerDiv, orderClasss[i], orderText[i]);

        }

        main.appendChild(fragment);

    }

    /**
        Función para crear un botón.
        
        @param parent elemento padre al cual se añadirá el botón.
        @param class clase para añadirle estilo al botón.
        @param text texto que se añadirá al botón.
    */ 
    let createButton = function (parent, classs, text) {

        let boton = document.createElement("button");
        boton.className = classs; 
        boton.textContent = text;
        parent.appendChild(boton);

    }


    /**
        Función para crear un botón.

        @param div elemento div que se añadirá al padre y al que se le añadirán los estilos.
        @param parent elemento padre al que se añadira el elemento div.
        @param class clase para añadirle estilos al div.
    */ 
    let addDiv = function (div, parent, classs) {

        div.className = classs; 
        parent.appendChild(div);

    }

    window.addEventListener("load", init);

}