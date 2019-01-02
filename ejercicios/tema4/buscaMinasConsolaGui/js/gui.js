import { buscaMinas } from "./main.js";

  let containerTablero;
  let elegirNivel;

  function init() {
    containerTablero = document.getElementById("containerTablero");
    elegirNivel = document.getElementById("elegirNivel")

    elegirNivel.addEventListener("change", initJuego);
    
    //generarTableroGui()
    console.log(buscaMinas.filas);
  };



let initJuego = function () {
    buscaMinas.nivel = this[this.selectedIndex].value;
    buscaMinas.init();
    generarTableroGui();
}


let generarTableroGui = function() {
    containerTablero.style.display = "grid";
    containerTablero.style.gridTemplateColumns =
      "repeat(" + buscaMinas.columnas + ", 1fr)";

    for (let i = 0; i < buscaMinas.columnas; i++) {
      for (let j = 0; j < buscaMinas.columnas; j++) {
        let input = document.createElement("input");
        input.id = i + "-" + j;
        input.value = "";
        input.readOnly = "true";
        input.addEventListener("click", picarGui.bind(null,i,j));
        //input.addEventListener("mousedown", buscaMinas.colocarBandera);
        input.classList.add("verde");
        containerTablero.appendChild(input);
      }
    }
  };

  let actualizarGui = function () {
        for (let i = 0; i < buscaMinas.columnas; i++) {
            for (let j = 0; j < buscaMinas.columnas; j++) {
                limpiarClasesCss(document.getElementById(i + "-" + j));
                if (buscaMinas.tableroVisible[i][j] === "#"){
                    document.getElementById(i + "-" + j).className = "verde";
                }else if (buscaMinas.tableroVisible[i][j] === "!"){
                    document.getElementById(i + "-" + j).className = "rojo";
                }else if (buscaMinas.tableroVisible[i][j] !== "!" && buscaMinas.tableroVisible[i][j] !== "#"){
                    if (buscaMinas.tableroVisible[i][j] === 0){
                        document.getElementById(i + "-" + j).value = ""
                    }else{
                        document.getElementById(i + "-" + j).value = buscaMinas.tableroVisible[i][j]
                    }
                    
                    document.getElementById(i + "-" + j).className = "blanco";
                }
            }
        }
    }

let picarGui = function (i,j) {
    buscaMinas.picar(i,j)
    actualizarGui();
}

let limpiarClasesCss = function (element) {
    if (element.classList.contains("verde") || element.classList.contains("rojo") ||  element.classList.contains("blano")){
        element.className = "";
    }
}

  window.addEventListener("load", init);

