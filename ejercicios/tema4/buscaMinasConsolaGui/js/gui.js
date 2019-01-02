import { buscaMinas } from "./main.js";

  let containerTablero;
  let elegirNivel;
  let audio;
  let toogleAudio;
  let timer;
  let time;

  function init() {
    containerTablero = document.getElementById("containerTablero");
    elegirNivel = document.getElementById("elegirNivel")
    audio = document.getElementById("audio")
    toogleAudio = document.getElementById("silenciarAudio");
    timer = document.getElementById("timer");
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
        this.disabled = true;
        buscaMinasGUI.generarTableroGui();
        buscaMinasGUI.crearDivRecord();
        buscaMinasGUI.mostrarTiempoPartida();
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
        if (buscaMinas.flagGanado){
            buscaMinasGUI.comprobarRecord();
        }
    },
    /**
    * Realiza la accion de picar y actualiza la GUI
    */
    marcarGui(i,j) {
        buscaMinas.marcar(i,j)
        buscaMinasGUI.actualizarGui();
        if (buscaMinas.flagGanado){
            buscaMinasGUI.comprobarRecord();
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
    /**
     * Crear div para el timer y
     */
    crearDivTimer() {
        timer.innerHTML = `<img src="images/hourglass.svg" /><p id="time"></p>`;
        time = document.getElementById("time");
    },
    /**
     * Crea los divs para el record y el tiempo
     */
    crearDivRecord() {
        buscaMinasGUI.crearDivTimer();
        if (document.getElementById("record")) {
          document.getElementById("record").remove();
        }
        let container = document.getElementById("container");
        let div = document.createElement("div");
        div.id = "record";
        time.innerHTML = `<div id="record"></div>`;
    
        if (buscaMinas.nivel === "facil") {
          if (localStorage.getItem("recordFacil") !== null) {
            div.textContent = `Record: ${localStorage.getItem(
              "recordFacil"
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
        }else if (buscaMinas.nivel === "experto") {
            if (localStorage.getItem("recordExperto") !== null) {
              div.textContent = `Record: ${localStorage.getItem(
                "recordExperto"
              )}`;
            } else {
              div.textContent = `Record: 0`;
            }
          }
    
        container.appendChild(div);
      },
      /**
       * Comprueba el record y lo actualiza
       */
      comprobarRecord() {
        let tiempo = parseInt(document.querySelector("#timer p").textContent);
   
        if (buscaMinas.nivel === "facil") {
          if (localStorage.getItem("recordFacil") === null) {
            localStorage.setItem("recordFacil", tiempo);
          } else {
            if (
              localStorage.getItem("recordFacil") === 0 ||
              localStorage.getItem("recordFacil") > tiempo
            ) {
              localStorage.setItem("recordFacil", tiempo);
            }
          }
        } else if (buscaMinas.nivel === "intermedio") {
          if (localStorage.getItem("recordIntermedio") === null) {
            localStorage.setItem("recordIntermedio", tiempo);
          } else {
            if (
              localStorage.getItem("recordIntermedio") === 0 ||
              localStorage.getItem("recordIntermedio") > tiempo
            ) {
              localStorage.setItem("recordIntermedio", tiempo);
            }
          }
        }else if (buscaMinas.nivel === "experto") {
            if (localStorage.getItem("recordExperto") === null) {
              localStorage.setItem("recordExperto", tiempo);
            } else {
              if (
                localStorage.getItem("recordExperto") === 0 ||
                localStorage.getItem("recordExperto") > tiempo
              ) {
                localStorage.setItem("recordExperto", tiempo);
              }
            }
          }
      },
      /**
       * Muestra el tiempo de partida
       */
      mostrarTiempoPartida() {
        
        let seconds = 0;
  
        let interv = setInterval(() => {
          if (
            !buscaMinas.flagFinPartida && 
            !buscaMinas.flagGanado
          ) {
            seconds++;
            time.textContent = seconds;
          } else {
            //buscaMinas.resetTime = false;
            clearInterval(interv);
            if (buscaMinas.flagGanado) {
              buscaMinas.comprobarRecord();
            }
          }
        }, 1000);
      }

  }

  window.addEventListener("load", init);

