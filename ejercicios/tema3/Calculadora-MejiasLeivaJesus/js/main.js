/**
    Calculadora Js vanilla
    @author Jesús Mejias Leiva
*/

{

    let main;
    let buttons;
    let output;
    let calculadora;

    function init(){

        main = document.getElementsByTagName("main")[0];


        createLayout();

        functionality();



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
        showInput.value = "0";
        let attrId = document.createAttribute("id");
        attrId.value = "output";
        showInput.setAttributeNode(attrId);
        showContainerDiv.appendChild(showInput);

        // crear container-botones
        let buttonsContainerDiv = document.createElement("div");
        addDiv(buttonsContainerDiv, containerDiv, "buttons-container");

        // array con las clases ordenadas para recorrerlas
        let orderClasss = ["btnRed","btnOrange","btnOperation","btnOperation","btnPrincipal", "btnPrincipal","btnPrincipal","btnOperation","btnPrincipal","btnPrincipal", "btnPrincipal","btnOperation","btnPrincipal","btnPrincipal","btnPrincipal", "btnOperation","btnPrincipal","btnOperation","btnGrey","btnAccent"];

        // array con el texto que contendrán los botones, ordenado para recorrerlo
        let orderText = ["CE","DEL","%","+","7","8","9","-","4","5","6","x","1","2","3","/","0","+/-",",","="];
        
        let orderIds = ["CE","DEL","percentage","sum","7","8","9","subtraction","4","5","6","multiplication","1","2","3","division","0","moreLess","coma","same"];


        orderClasss.forEach((element, index) => {

            createButton(buttonsContainerDiv, orderClasss[index], orderText[index], orderIds[index]);

        });


        main.appendChild(fragment);

        output = document.getElementById("output");
        buttons = document.getElementsByTagName("button");

    }

    let functionality = function (){



        Array.from(buttons).forEach((element) => {


            let idValue = element.getAttribute("id");

            if (parseInt(idValue)) {

                //console.log(idValue);

                document.getElementById(idValue).addEventListener("click", () => { 
                    
                    
                    if(output.value === "0"){
                        output.value = idValue;
                    }else {
                        output.value += idValue;
                    }
                });
                

            }else{

                //console.log(idValue);

                let btn = document.getElementById(idValue);
                if(btn){

                    btn.addEventListener("click", () => {

                        switch (idValue) {
                            case "sum":
                                    console.log("suma");
                                break;
                            case "multiplication":
                                    console.log("multiplicacion");
                                break;
                            case "division":
                                    console.log("division");
                                break;
                            case "moreLess":
                                    console.log("masMenos");
                                break;
                            case "subtraction":
                                    console.log("resta");
                                break;
                            case "same":
                                    console.log("igual");
                                break;
                            case "percentage":
                                    console.log("porcentaje");
                                break;
                            case "DEL":
                                    let deleteString = output.value.substring(0, output.value.length -1);
                                    console.log(deleteString);
                                    output.value = deleteString;
                                    if ( output.value === "") {
                                        output.value = 0;
                                    }
                                    //console.log("borrar");
                                break;
                            case "CE":
                                    output.value = 0;
                                    //console.log("resetear");
                                break;
                            case "coma":
                                    if (!output.value.includes(",")) {
                                        output.value += ",";
                                    }
                                    //console.log("coma");
                                break;
                            default:
                                
                        }

                    });

                }
                



            }

        });
    }

    /**
        Función para crear un botón.
        
        @param parent elemento padre al cual se añadirá el botón.
        @param class clase para añadirle estilo al botón.
        @param text texto que se añadirá al botón.
    */ 
    let createButton = function (parent, classs, text, id) {

        let boton = document.createElement("button");
        boton.className = classs; 
        boton.textContent = text;
        let attrId = document.createAttribute("id");
        attrId.value = id;
        boton.setAttributeNode(attrId);
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