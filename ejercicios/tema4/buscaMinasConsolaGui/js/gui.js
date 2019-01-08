/**
 * Módulo GUI para el juego buscaminas
 * @author Jesús Mejías Leiva
 */
import { buscaMinas } from "./main.js";

  let containerTablero;
  let elegirNivel;
  let audio;
  let toogleAudio;
  let timer;
  let time;
  let span;

  function init() {
    containerTablero = document.getElementById("containerTablero");
    elegirNivel = document.getElementById("elegirNivel")
    audio = document.getElementById("audio")
    toogleAudio = document.getElementById("silenciarAudio");
    timer = document.getElementById("timer");
    span = document.getElementById("span");
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
        this.style.widht = "auto"; 
        buscaMinasGUI.generarTableroGui();
        buscaMinasGUI.crearDivRecord();
        buscaMinasGUI.crearDivNumBombas();
        buscaMinasGUI.mostrarTiempoPartida();
        buscaMinasGUI.volverAjugar();

        
    },
    /**
    * Genera el tablero GUI
    */
    generarTableroGui(){
        containerTablero.style.display = "grid";
        containerTablero.style.gridTemplateColumns =
        "repeat(" + buscaMinas.columnas + ", 1fr)";
        containerTablero.style.border = "2px solid #6A1B9A";

        for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
            let input = document.createElement("input");
            input.id = i + "-" + j;
            input.value = "";
            input.readOnly = "true";
            input.className = "violet"
            input.addEventListener("click", buscaMinasGUI.picarGui.bind(null,i,j));
            input.addEventListener("mousedown", buscaMinasGUI.marcarGui.bind(null,i,j));
            
            containerTablero.appendChild(input);
        }
    }
    },
    /**
    * Actualiza la GUI con los valores del tablero visible interno
    */
    actualizarGui(){
        if (buscaMinas.flagFinPartida || buscaMinas.flagGanado){
          buscaMinasGUI.descubrirMinas();
        }else{
          for (let i = 0; i < buscaMinas.filas; i++) {
            for (let j = 0; j < buscaMinas.columnas; j++) {
                buscaMinasGUI.limpiarClasesCss(document.getElementById(i + "-" + j));
                if (buscaMinas.tableroVisible[i][j] === "#"){
                    document.getElementById(i + "-" + j).className = "violet";
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
        
    },
    /**
    * Realiza la accion de picar y actualiza la GUI
    */
    picarGui(i,j){
      if (buscaMinas.flagGanado || buscaMinas.flagFinPartida){
        event.preventDefault;
      }else{
        try {
          if (event.buttons === 0){
            buscaMinas.picar(i,j)
            buscaMinasGUI.actualizarGui();
            if (buscaMinas.flagGanado){
                buscaMinasGUI.comprobarRecord();
            }
          }
        } catch (e) {
            buscaMinasGUI.descubrirMinas();
            if (e.message === "Pulsate una mina"){
              span.textContent = e.message;
            }else{
              span.textContent = e.message;
            }
          
        }
      }
    },
    /**
    * Realiza la accion de picar y actualiza la GUI
    */
    marcarGui(i,j) {
      try {
        if (event.buttons === 2){
          buscaMinas.marcar(i,j)
          buscaMinasGUI.actualizarGui();
          if (buscaMinas.flagGanado){
              buscaMinasGUI.comprobarRecord();
          }
        }
      } catch (e) {
        buscaMinasGUI.descubrirMinas();
        span.textContent = e.message;
      }

    },

    /**
     * Descubre las minas
     */
    descubrirMinas(){
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinasGUI.limpiarClasesCss(document.getElementById(i + "-" + j));
                if (buscaMinas.tableroMaster[i][j] === "x"){
                    document.getElementById(i + "-" + j).className = "amarillo";
                }else{
                    document.getElementById(i + "-" + j).className = "blanco";
                }
        }
      }
    },
    /**
     * Crea un boton para volver a jugar
     */
    volverAjugar(){

      let btnVolverAjugar = document.createElement("button");
      btnVolverAjugar.id = "btnVolverAjugar";
      btnVolverAjugar.textContent = "Volver a jugar"


      let parentContainerTablero = containerTablero.parentNode;
      parentContainerTablero.appendChild(btnVolverAjugar);

      let btnVolverJugar = document.getElementById("btnVolverAjugar");
      btnVolverJugar.addEventListener("click", ()=> location.reload());

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

      if (element){
        if (element.classList.contains("violet") || element.classList.contains("rojo") ||  element.classList.contains("blanco") ||  element.classList.contains("amarillo")){
          element.className = "";
        }
      }  
      
    },

    /**
     * Crear div numero de bombas
     */
    crearDivNumBombas(){
      let container = document.getElementById("container");
      let div = document.createElement("div");
      div.id = "numBombas";
      div.innerHTML = `<img src="images/bomb.svg"/> ${buscaMinas.numMinas}`;
      container.appendChild(div);
    },

    /**
     * Crear div para el timer
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
            div.innerHTML = `<img src="images/record.svg" height="30px"/> ${localStorage.getItem(
              "recordFacil"
            )}`;
          } else {
            div.innerHTML = `<img src="images/record.svg" height="30px"/> 0`;
          }
        } else if (buscaMinas.nivel === "intermedio") {
          if (localStorage.getItem("recordIntermedio") !== null) {
            div.textContent = `<img src="images/record.svg" height="30px"/> ${localStorage.getItem(
              "recordIntermedio"
            )}`;
          } else {
            div.innerHTML = `<img src="images/record.svg" height="30px"/> 0`;
          }
        }else if (buscaMinas.nivel === "experto") {
            if (localStorage.getItem("recordExperto") !== null) {
              div.innerHTML = `<img src="images/record.svg" height="30px"/> ${localStorage.getItem(
                "recordExperto"
              )}`;
            } else {
              div.innerHTML = `<img src="images/record.svg" height="30px"/> 0`;
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
            clearInterval(interv);
            if (buscaMinas.flagGanado) {
              buscaMinasGUI.comprobarRecord();
            }
          }
        }, 1000);
      }

  }

  window.addEventListener("load", init);

