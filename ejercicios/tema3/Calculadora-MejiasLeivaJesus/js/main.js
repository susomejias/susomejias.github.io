/**
    Calculadora Js vanilla
    @author Jesús Mejias Leiva
*/

{

    let main;
    let buttons;
    let output;

    function init(){

        main = document.getElementsByTagName("main")[0];


        calculadora.crateLayout();
        calculadora.functionality();


    }

    let calculadora = {

        cumulative : 0,

        flag: false,

        operation: "",

        crateLayout: function () { 


            let fragment = document.createDocumentFragment();
    
    
            // crear container
            let containerDiv = document.createElement("div");
            this.addDiv(containerDiv, fragment , "container");
    
            // crear container-mostrar
            let showContainerDiv = document.createElement("div");
            this.addDiv(showContainerDiv, containerDiv, "show-container");
    
            // crear input para mostrar la salida
            let showInput = document.createElement("input");
            showInput.type = "text";
            showInput.value = "0";
            let attrId = document.createAttribute("id");
            attrId.value = "output";
            let disabled = document.createAttribute("disabled");
            disabled.value = "disabled";
            showInput.setAttributeNode(disabled);
            showInput.setAttributeNode(attrId);
            showContainerDiv.appendChild(showInput);
    
            // crear container-botones
            let buttonsContainerDiv = document.createElement("div");
            this.addDiv(buttonsContainerDiv, containerDiv, "buttons-container");
    
            // array con las clases ordenadas para recorrerlas
            let orderClasss = ["btnRed","btnOrange","btnOperation","btnOperation","btnPrincipal", "btnPrincipal","btnPrincipal","btnOperation","btnPrincipal","btnPrincipal", "btnPrincipal","btnOperation","btnPrincipal","btnPrincipal","btnPrincipal", "btnOperation","btnPrincipal","btnOperation","btnGrey","btnAccent"];
    
            // array con el texto que contendrán los botones, ordenado para recorrerlo
            let orderText = ["CE","DEL","%","+","7","8","9","-","4","5","6","x","1","2","3","/","0","+/-",",","="];
            
            let orderIds = ["CE","DEL","percentage","sum","7","8","9","subtraction","4","5","6","multiplication","1","2","3","division","0","moreLess","coma","same"];
    
    
            orderClasss.forEach((element, index) => {
    
                this.createButton(buttonsContainerDiv, orderClasss[index], orderText[index], orderIds[index]);
    
            });
    
    
            main.appendChild(fragment);
    
            output = document.getElementById("output");
            buttons = document.getElementsByTagName("button");
    
        },


        functionality: function (){


            Array.from(buttons).forEach((element) => {
    
    
                let idValue = element.getAttribute("id");
    
                if (parseFloat(idValue)) {
    
                    //console.log(idValue);
    
                    document.getElementById(idValue).addEventListener("click", () => { 
                        
                        
                        if(output.value === "0" || flag){
                            output.value = parseFloat(idValue);
                            flag = false
                        }else {
                            output.value += parseFloat(idValue);
                        }
    
                    });
                    
    
                }else{
    
                    //console.log(idValue);
    
                    let btn = document.getElementById(idValue);
                    if(btn){
    
                        btn.addEventListener("click", () => {
    
                            switch (idValue) {
                                case "sum":
                                        cumulative += parseFloat(output.value);
                                        flag = true;
                                        operation = "sum";
                                        //output.value = cumulative;
                                        //console.log(cumulative);
                                    break;
                                case "multiplication":
                                        console.log("multiplicacion");
                                    break;
                                case "division":
                                        console.log("division");
                                    break;
                                case "moreLess":
    
                                        if (parseFloat(output.value) > 0 ) {
                                            output.value = (parseFloat(output.value) * -1).toString();
                                        }else {
                                            //console.log(output.value); 
                                            output.value = output.value.replace("-" , "");
                                        }
                                    break;
                                case "subtraction":
                                        if (!output.value.includes("-")){
                                            output.value = "-";
                                        }
                                        //console.log("resta");
                                    break;
                                case "same":
    
                                        if (operation === "sum"){
                                            cumulative += parseFloat(output.value);
                                            output.value = cumulative;
                                        }
    
                                        flag = false;
                                        console.log(cumulative);
                                    break;
                                case "percentage":
                                        console.log("porcentaje");
                                    break;
                                case "DEL":
                                        if (output.value.includes("-") && output.value.length === 2){
                                            output.value = output.value.substring(1,2);
                                        }
                                        
                                        output.value = output.value.slice(0, output.value.length -1);
                                        
    
                                        if ( output.value === "") {
                                            output.value = 0;
                                            cumulative = 0;
                                        }
                                        flag = false;
    
                                        
                                        //console.log("borrar");
                                    break;
                                case "CE":
                                        output.value = 0;
                                        cumulative = 0;
                                        flag = false;
                                        //console.log("resetear");
                                    break;
                                case "coma":
                                        if (!output.value.includes(".")) {
                                            output.value += ".";
                                        }
                                        //console.log("coma");
                                    break;
                                case "0":
                                        if (output.value !== "0") {
                                            output.value += "0"; 
                                        }
    
                                    break;
                                default:
                                    
                            }
    
                        });
    
                    }
                    
    
    
    
                }
    
            });
        },

        createButton : function (parent, classs, text, id) {

            let boton = document.createElement("button");
            boton.className = classs; 
            boton.textContent = text;
            let attrId = document.createAttribute("id");
            attrId.value = id;
            boton.setAttributeNode(attrId);
            parent.appendChild(boton);
    
        },

        addDiv: function (div, parent, classs) {

            div.className = classs; 
            parent.appendChild(div);
    
        }

    }

    window.addEventListener("load", init);

}