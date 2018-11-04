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

        calculadora.createLayout();
        calculadora.functionality();


    }

    let calculadora = {

        cumulative : 0,

        flag: false,

        sameFlag: false,

        operation: "",

        createLayout: function () { 


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
                        
                        
                        if(output.value === "0" || this.flag){
                            output.value = parseFloat(idValue);
                            this.flag = false;
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
                                        this.calculateCumulative("sum");
                                    break;
                                case "multiplication":
                                        this.calculateCumulative("multiplication");
                                    break;
                                case "division":
                                        this.calculateCumulative("division");
                                    break;
                                case "moreLess":

                                    if (output.value !== "0"){
                                                
                                            if (!output.value.includes("-")){
                                                output.value = "-" + output.value;
                                            }else{
                                                output.value = output.value.replace("-" , "");
                                            }
                                    }
                                        

                                    break;
                                case "subtraction":
                                        this.calculateCumulative("subtraction");
                                    break;
                                case "same":
                                        this.calculate();
                                    break;
                                case "percentage":
                                        
                                        if (output.value !== "" && output.value !== "0") {
                                            output.value = parseFloat(output.value / 100);
                                        }


                                    break;
                                case "DEL":

                                        this.cumulative = 0;

                                        if (output.value.includes("-") && output.value.length === 2){
                                            output.value = output.value.substring(1,2);
                                        }else if (output.value.includes("-") && output.value.includes(".")) {
                                            output.value = "0";
                                            this.cumulative = 0;

                                        }else if (output.value.includes(".") && !output.value.includes("-")) {
                                            output.value = "0";
                                            this.cumulative = 0;
                                        }else {

                                            output.value = output.value.slice(0, output.value.length -1);
                                        }
                                        
                                        
                                        if ( output.value === "") {
                                            output.value = 0;
                                            this.cumulative = 0;
                                        }
                                        
                                        this.flag = false;
                                        this.operation = "";

    
                                        
                                        //console.log("borrar");
                                    break;
                                case "CE":
                                        output.value = 0;
                                        this.cumulative = 0;
                                        this.flag = false;
                                        this.operation = "";
                                        //console.log("resetear");
                                    break;
                                case "coma":
                                        if (!output.value.includes(".")) {
                                            output.value += ".";
                                        }

                                        this.flag = false;

                                        //console.log("coma");
                                    break;
                                case "0":

                                        let regexZeroDecimal = /[0]{1}.[0]?/;

                                        if (this.operation !== "" && !regexZeroDecimal.test(output.value)){
                                            output.value = "0";
                                            this.flag = true;
                                        }

                                        if (this.operation !== "" && regexZeroDecimal.test(output.value) && output.value !== "0") {
                                            output.value += "0";
                                            this.flag = false;
                                        }

                                        if (this.operation === "" && output.value !== "0"){
                                            output.value += "0";
                                            this.flag = false;
                                        }

                                        //console.log(typeof output.value);
    
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
    
        },

        calculateCumulative: function (type) {

            if (this.operation === ""){
                this.cumulative += parseFloat(output.value);
            }
            this.flag = true;
            this.operation = type;
            this.sameFlag = false;

        },

        calculate : function(){

            if (!this.sameFlag) {

                switch (this.operation) {

                    case "sum":
                        this.cumulative += parseFloat(output.value);
                        output.value = this.cumulative;
                        this.sameFlag = true;
                        break;
                    case "subtraction":
                        this.cumulative -= parseFloat(output.value);
                        output.value = this.cumulative;
                        this.sameFlag = true;
                        break;
                    case "multiplication":
                        this.cumulative *= parseFloat(output.value);
                        output.value = this.cumulative;
                        this.sameFlag = true;
                        break;
                    case "division":
                        this.cumulative /= parseFloat(output.value);
                        output.value = this.cumulative;
                        this.sameFlag = true;
                        break;
                    

                }
            }

            this.flag = false;

        }

    }

    window.addEventListener("load", init);

}