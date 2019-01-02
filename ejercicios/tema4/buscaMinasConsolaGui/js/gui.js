import { buscaMinas } from "./main.js";

  let containerTablero;
  let elegirNivel;
  let audio;
  let toogleAudio;

  function init() {
    containerTablero = document.getElementById("containerTablero");
    elegirNivel = document.getElementById("elegirNivel")
    audio = document.getElementById("audio")
    toogleAudio = document.getElementById("silenciarAudio");

    elegirNivel.addEventListener("change", buscaMinasGUI.initJuego);
    toogleAudio.addEventListener("click", buscaMinasGUI.audioFunctionality);
    
  };

  let buscaMinasGUI = {

    /**
    * Inicia el juego GUI
    */
    initJuego(){
        buscaMinas.nivel = this[this.selectedIndex].value;
        buscaMinas.init();
        buscaMinasGUI.generarTableroGui();
        buscaMinasGUI.crearDivRecord();
    },
    /**
    * Genera el tablero GUI
    */
    generarTableroGui(){
        containerTablero.style.display = "grid";
        containerTablero.style.gridTemplateColumns =
        "repeat(" + buscaMinas.columnas + ", 1fr)";

        for (let i = 0; i < buscaMinas.columnas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
            let input = document.createElement("input");
            input.id = i + "-" + j;
            input.value = "";
            input.readOnly = "true";
            input.addEventListener("click", buscaMinasGUI.picarGui.bind(null,i,j));
            input.addEventListener("mousedown", buscaMinasGUI.marcarGui.bind(null,i,j));
            input.classList.add("verde");
            containerTablero.appendChild(input);
        }
    }
    },
    /**
    * Actualiza la GUI con los valores del tablero visible interno
    */
    actualizarGui(){
        for (let i = 0; i < buscaMinas.columnas; i++) {
            for (let j = 0; j < buscaMinas.columnas; j++) {
                buscaMinasGUI.limpiarClasesCss(document.getElementById(i + "-" + j));
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
    },
    /**
    * Realiza la accion de picar y actualiza la GUI
    */
    picarGui(i,j){
        buscaMinas.picar(i,j)
        buscaMinasGUI.actualizarGui();
    },
    /**
    * Realiza la accion de picar y actualiza la GUI
    */
    marcarGui(ev,i,j) {
        if (ev.button === 2){
            buscaMinas.marcar(i,j)
            buscaMinasGUI.actualizarGui();
        }
    },
    /**
    * Maneja la funcionalidad del audio
    */
    audioFunctionality(params) {
        audio.muted = !audio.muted;
        if (audio.muted) {
            silenciarAudio.src = "./images/volumenOff.svg";
        } else {
            silenciarAudio.src = "./images/volumenOn.svg";
        }
    },
    /**
    * Limpia las clases del elemento pasado por parametro
    * @param element elemento del DOM
    */
    limpiarClasesCss(element) {
        if (element.classList.contains("verde") || element.classList.contains("rojo") ||  element.classList.contains("blanco")){
            element.className = "";
        }
    },

    crearDivRecord(params) {

        if (document.getElementById("record")) {
          document.getElementById("record").remove();
        }
        let container = document.getElementById("container");
        let div = document.createElement("div");
        div.id = "record";
        timer.innerHTML = `<div id="record"></div>`;
    
        if (buscaMinas.nivel === "principiante") {
          if (localStorage.getItem("recordPrincipiante") !== null) {
            div.textContent = `Record: ${localStorage.getItem(
              "recordPrincipiante"
            )}`;
          } else {
            div.textContent = `Record: 0`;
          }
        } else if (buscaMinas.nivel === "intermedio") {
          if (localStorage.getItem("recordIntermedio") !== null) {
            div.textContent = `Record: ${localStorage.getItem(
              "recordIntermedio"
            )}`;
          } else {
            div.textContent = `Record: 0`;
          }
        }
    
        container.appendChild(div);
      }

  }








  window.addEventListener("load", init);

