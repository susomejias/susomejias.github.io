/**
    Calculadora Js vanilla
    @author Jesús Mejías Leiva
*/

{

    let main;

    function init(){

        // container principal del cuál parte todo
        main = document.getElementsByTagName("main")[0];

        calculator.createLayout();

    }

    let calculator = {

        buttons : undefined,

        cumulative : 0,

        output: 0,

        operation: "",

        decimalControlFlag : false,

        createLayout: function () { 


            let fragment = document.createDocumentFragment();
    
    
            // crear container
            let containerDiv = document.createElement("div");
            calculator.addDiv(containerDiv, fragment , "container");
    
            // crear container-mostrar
            let showContainerDiv = document.createElement("div");
            calculator.addDiv(showContainerDiv, containerDiv, "show-container");
    
            // crear input para mostrar la salida
            let showInput = document.createElement("input");
            showInput.type = "text";
            showInput.value = 0;
            let attrId = document.createAttribute("id");
            attrId.value = "output";
            let disabled = document.createAttribute("disabled");
            disabled.value = "disabled";
            showInput.setAttributeNode(disabled);
            showInput.setAttributeNode(attrId);
            showContainerDiv.appendChild(showInput);
    
            // crear container-botones
            let buttonsContainerDiv = document.createElement("div");
            calculator.addDiv(buttonsContainerDiv, containerDiv, "buttons-container");
    
            // array con las clases ordenadas para recorrerlas
            let orderClasss = ["btnRed","btnOrange","btnOperation","btnOperation","btnPrincipal", "btnPrincipal","btnPrincipal","btnOperation","btnPrincipal","btnPrincipal", "btnPrincipal","btnOperation","btnPrincipal","btnPrincipal","btnPrincipal", "btnOperation","btnPrincipal","btnOperation","btnGrey","btnAccent"];
    
            // array con el texto que contendrán los botones, ordenado para recorrerlo
            let orderText = ["CE","DEL","%","+","7","8","9","-","4","5","6","x","1","2","3","/","0","+/-",",","="];
            
            let orderIds = ["CE","DEL","percentage","sum",7,8,9,"subtraction",4,5,6,"multiplication",1,2,3,"division",0,"moreLess","coma","same"];
    
            
    
            orderClasss.forEach((element, index) => {
    
                let btn = calculator.createButton(buttonsContainerDiv, orderClasss[index], orderText[index], orderIds[index]);
                            
                
                btn.addEventListener("click", calculator.clickButton);
    
            });
    
    
            main.appendChild(fragment);
    
            calculator.output = document.getElementById("output");
            buttons = document.getElementsByTagName("button");

        },


        createButton : function (parent, classs, text, id) {

            let boton = document.createElement("button");
            boton.className = classs; 
            boton.textContent = text;
            let attrId = document.createAttribute("id");
            attrId.value = id;
            boton.setAttributeNode(attrId);
            parent.appendChild(boton);

            return boton;
    
        },

        addDiv: function (div, parent, classs) {

            div.className = classs; 
            parent.appendChild(div);
    
        },

        calculateCumulative: function () {

            switch (calculator.operation) {
                case "sum":
                    return parseFloat(calculator.cumulative) + parseFloat(calculator.output.value);
                case "subtraction":
                    return parseFloat(calculator.cumulative) - parseFloat(calculator.output.value);
                case "multiplication":
                    return parseFloat(calculator.cumulative) * parseFloat(calculator.output.value);
                case "division":
                    return parseFloat(calculator.cumulative) / parseFloat(calculator.output.value);
            }

        },

        clickButton: function() {
            let value = this.getAttribute("id");
            //console.log(id);
            switch (value) {
                case "CE":
                    calculator.output.value = "0";
                    calculator.operation = "";
                    calculator.cumulative = 0;
                    break;
                case "DEL":
                    let cadenaRecortada = calculator.output.value.slice(0,calculator.output.value.length - 1);
                    
                    //console.log(calculadora.output.value.length);
                    
                    if (cadenaRecortada == 0 || (calculator.output.value.includes("-") && calculator.output.value.length === 2)) {
                        calculator.output.value = 0;
                    }else {
                        calculator.output.value = cadenaRecortada;
                    }
        
                break;
                case "percentage": 
                    if (calculator.output.value !== ""){
                        calculator.output.value = parseFloat(calculator.output.value) / 100;
                    }  
                break;
                case "sum":
                case "subtraction":
                case "multiplication":
                case "division":
                    if (calculator.output.value !== "") {
                        if (calculator.operation !== "") {
                            calculator.cumulative = calculator.calculateCumulative();
                            calculator.operation = value;
                            calculator.isCumulativeFinite();
                        } else {
                            calculator.cumulative = parseFloat(calculator.output.value);
                            calculator.operation = value;
                            calculator.isCumulativeFinite();
                        }
                    }
                    calculator.decimalControlFlag = true;
                break;
                case "moreLess":
                    if (calculator.output.value != "" && calculator.output.value != "0") {
                        let primerCaracter = calculator.output.value.slice(0, 1);
                        if (primerCaracter == "-"){
                            calculator.output.value = calculator.output.value.replace("-","");
                        }else{
                            calculator.output.value ="-" + calculator.output.value;
                        }
                    }
                break;
                case "coma":
                    if (calculator.output.value != "" && !calculator.output.value.includes(".")) {
                        calculator.output.value += ".";
                    }
                    break;
                case "same":
                    if (calculator.operation != "" && calculator.output.value.length > 0) {
                        calculator.cumulative = calculator.calculateCumulative();
                        calculator.isCumulativeFinite();
                        calculator.operation = "";
                    } else {
                        calculator.operation = "";
                        calculator.isCumulativeFinite();
                    }
                break;
                default:

                // tenga coma y operacion vacia, machaque

                let regexDecimal = /-?\d+(\.\d+)/;

                console.log(regexDecimal.test(calculator.output.value));

                
                    
                    
                    if ((calculator.output.value === "0" || calculator.decimalControlFlag)){
                        calculator.output.value = value;
                        calculator.decimalControlFlag = false;
                    }else{
                        calculator.output.value += value;
                    } 
                
                
                
                break;
            }
    },

        isCumulativeFinite : function (){

            if (isFinite(calculator.cumulative)) {
                calculator.output.value = calculator.cumulative;
            }else{
                calculator.output.value = "0";
            }

        }

    }

    window.addEventListener("load", init);

}