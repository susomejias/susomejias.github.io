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
let instrucciones;

function init() {
  window.addEventListener("contextmenu", () => false);
  containerTablero = document.getElementById("containerTablero");
  elegirNivel = document.getElementById("elegirNivel");
  audio = document.getElementById("audio");
  toogleAudio = document.getElementById("silenciarAudio");
  timer = document.getElementById("timer");
  instrucciones = document.getElementById("instrucciones");

  elegirNivel.addEventListener("change", buscaMinasGUI.initJuego);
  toogleAudio.addEventListener("click", buscaMinasGUI.audioFunctionality);
  instrucciones.addEventListener("click", buscaMinasGUI.abrirInstrucciones);
  container.classList.add("shadowMaterialButton");
}

  let buscaMinasGUI = {
  flagRecord: false,
  /**
   * Inicia el juego GUI
   */
  initJuego() {
    buscaMinas.nivel = this[this.selectedIndex].value;
    buscaMinas.init();
    this.disabled = true;
    buscaMinasGUI.generarTableroGui();
    buscaMinasGUI.crearDivRecord();
    buscaMinasGUI.crearDivNumBombas();
    buscaMinasGUI.crearDivNumBanderas();
    buscaMinasGUI.mostrarTiempoPartida();
    buscaMinasGUI.volverAjugar();
    buscaMinasGUI.cssAlEmpezar();
  },
  abrirInstrucciones() {
    window.open("./instrucciones.html", "", "");
  },
  /**
   * Inserta el css necesario al comienzo del juego
   */
  cssAlEmpezar() {
    let container = document.getElementById("container");
    container.style.width = "100%";
    container.style.borderBottom = "2px solid #6A1B9A";

    document
      .getElementById("btnVolverAjugar")
      .classList.add("shadowMaterialButton");

    containerTablero.classList.add("shadowMaterial");
  },
  /**
   * Genera el tablero GUI
   */
  generarTableroGui() {
    containerTablero.style.display = "grid";
    containerTablero.style.gridTemplateColumns =
      "repeat(" + buscaMinas.columnas + ", 1fr)";
    containerTablero.style.width = "100%";

    for (let i = 0; i < buscaMinas.filas; i++) {
      for (let j = 0; j < buscaMinas.columnas; j++) {
        let input = document.createElement("input");
        input.id = i + "-" + j;
        input.value = "";
        input.readOnly = "true";
        buscaMinasGUI.claseSegunNivel("violet", input);
        // preguntar lourdes como bindear el event para usar la funcion con arrow y bind()
        input.addEventListener("click", function(ev) {
          buscaMinasGUI.picarGui(ev, i, j);
        });
        input.addEventListener("mousedown", function(ev) {
          buscaMinasGUI.marcarGui(ev, i, j);
        });

        input.addEventListener("mousedown", function(ev) {
          buscaMinasGUI.despejarGui(ev, i, j);
        });

        containerTablero.appendChild(input);
      }
    }
  },
  /**
   * Despeja las casilla colindantes si el numero de banderas coincide con el valor de la casilla
   * @param ev evento
   * @param i coordenada para fila
   * @param j coordenada para columna
   */
  despejarGui(ev, i, j) {
    try {
      if (ev.buttons === 3) {
        buscaMinas.despejar(i, j);
        buscaMinasGUI.actualizarGui();
      }
    } catch (e) {
      buscaMinasGUI.descubrirMinas();
      if (e.message === "¡¡¡ Felicidades has ganado !!!") {
        console.log(buscaMinasGUI.flagRecord);
        
        // buscaMinasGUI.swalVolverAJugar(buscaMinasGUI.messageIsRecord(e.message), "success");

        buscaMinasGUI.swalVolverAJugar(e.message, "success");
      } else {
        buscaMinasGUI.swalVolverAJugar(e.message, "error");
      }
    }
  },
  /**
   * Clases según el nivel
   * @param classs clase que se le añadirá al input
   * @param input elemento al cuál se le añadirá la clase
   */
  claseSegunNivel(classs, input) {
    switch (buscaMinas.nivel) {
      case "facil":
        input.className = classs;
        input.classList.add("inputFacil");
        break;

      case "intermedio":
        input.className = classs;
        input.classList.add("inputIntermedio");
        break;

      case "experto":
        input.className = classs;
        input.classList.add("inputExperto");
        break;

      default:
        break;
    }
  },

  /**
   * Actualiza la GUI con los valores del tablero visible interno
   */
  actualizarGui() {
    if (buscaMinas.flagFinPartida || buscaMinas.flagGanado) {
      buscaMinasGUI.descubrirMinas();
    } else {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinasGUI.limpiarClasesCss(document.getElementById(i + "-" + j));
          if (buscaMinas.tableroVisible[i][j] === "#") {
            buscaMinasGUI.claseSegunNivel(
              "violet",
              document.getElementById(i + "-" + j)
            );
          } else if (buscaMinas.tableroVisible[i][j] === "!") {
            buscaMinasGUI.claseSegunNivel(
              "rojo",
              document.getElementById(i + "-" + j)
            );
          } else if (
            buscaMinas.tableroVisible[i][j] !== "!" &&
            buscaMinas.tableroVisible[i][j] !== "#"
          ) {
            if (buscaMinas.tableroVisible[i][j] === 0) {
              document.getElementById(i + "-" + j).value = "";
            } else {
              document.getElementById(i + "-" + j).value =
                buscaMinas.tableroVisible[i][j];
            }

            buscaMinasGUI.claseSegunNivel(
              "blanco",
              document.getElementById(i + "-" + j)
            );
          }
        }
      }
    }
  },
  /**
   * Realiza la accion de picar y actualiza la GUI
   * @param ev evento
   * @param i coordenada para la fila
   * @param j coordenada para la columna
   */
  picarGui(ev, i, j) {
    if (buscaMinas.flagGanado || buscaMinas.flagFinPartida) {
      ev.preventDefault;
    } else {
      try {
        if (ev.buttons === 0) {
          
          buscaMinas.picar(i, j);
          if (buscaMinas.flagGanado) {
            buscaMinasGUI.comprobarRecord();
          }
          
          buscaMinasGUI.actualizarGui();
          
        }
      } catch (e) {
        buscaMinasGUI.descubrirMinas();
        if (e.message === "¡¡¡ Felicidades has ganado !!!") {
          console.log(buscaMinasGUI.flagRecord);
          
          // buscaMinasGUI.swalVolverAJugar(buscaMinasGUI.messageIsRecord(e.message), "success");

          buscaMinasGUI.swalVolverAJugar(e.message, "success");
        } else {
          buscaMinasGUI.swalVolverAJugar(e.message, "error");
        }
      }
    }
  },


  /**
   * Realiza la accion de picar y actualiza la GUI
   * @param ev evento
   * @param i coordenada para la fila
   * @param j coordenada para la columna
   */
  marcarGui(ev, i, j) {
    buscaMinasGUI.disableContextMenu();
    
    
    try {
      if (ev.buttons === 2) {
        buscaMinas.marcar(i, j);
        buscaMinasGUI.actualizarGui();
        // actualizo el numero de banderas
        document.getElementById("numBanderas").innerHTML = `<img src="images/flag.svg" height="30px"/> ${buscaMinas.numBanderas}`;
        if (buscaMinas.flagGanado) {
          buscaMinasGUI.comprobarRecord();
        }
      }
    } catch (e) {
      buscaMinasGUI.descubrirMinas();
      if (e.message === "¡¡¡ Felicidades has ganado !!!") {

        // buscaMinasGUI.swalVolverAJugar(buscaMinasGUI.messageIsRecord(e.message), "success");
        buscaMinasGUI.swalVolverAJugar(e.message, "success");
      } else {
        buscaMinasGUI.swalVolverAJugar(e.message, "error");
      }
    }
  },
  /**
   * Carga la librería sweetalert para preguntar si desea jugar de nuevo
   * @param msg mensaje a mostra
   * @param icon icono que mostrará la ventana
   */
  swalVolverAJugar(msg,icon){

    let tiempoPartida = parseInt(document.querySelector("#timer #time").textContent);
    let recordNivel = buscaMinasGUI.obtenerRecordActualNivel();

    let message = "";
    let title = msg;

    if (icon === "success"){
      message = `Tu tiempo en esta partida a sido ${tiempoPartida} segundo/s. \n \n El record actual es de ${recordNivel} segundo/s.\n \n`;
    }
    if (icon === "success" && (recordNivel === 0 || tiempoPartida < recordNivel)){
      title = `${msg} \n además has establecido el record de este nivel en ${tiempoPartida} segundo/s. \n\n`;
    }
    
    swal({
      className: "buttons-Swal",
      title: title,
      text: message + "¿Desea jugar de nuevo?",
      icon: icon,
      buttons: {
        Si: true,
        No: true
      }
    }).then((result) => {
      
      if(result === "Si"){
        location.reload();
      }
    });
  },
  obtenerRecordActualNivel(){

    if (localStorage.getItem(buscaMinas.nivel) !== null){
      return parseInt(localStorage.getItem(buscaMinas.nivel));
    }else{
      return 0;
    }
  },
  /**
   * Descubre las minas
   */
  descubrirMinas() {
    for (let i = 0; i < buscaMinas.filas; i++) {
      for (let j = 0; j < buscaMinas.columnas; j++) {
        if (buscaMinas.tableroMaster[i][j] === "x") {
          buscaMinasGUI.claseSegunNivel(
            "amarillo",
            document.getElementById(i + "-" + j)
          );
        }
      }
    }
  },
  /**
   * Crea un boton para volver a jugar
   */
  volverAjugar() {
    let btnVolverAjugar = document.createElement("button");
    btnVolverAjugar.id = "btnVolverAjugar";
    btnVolverAjugar.textContent = "Volver a jugar";

    let tools = document.getElementById("tools");
    tools.appendChild(btnVolverAjugar);

    let btnVolverJugar = document.getElementById("btnVolverAjugar");
    btnVolverJugar.addEventListener("click", () => {
      // reseteamos el select
      elegirNivel.selectedIndex = 0;
      location.reload();
    });
  },

  /**
   * Maneja la funcionalidad del audio
   */
  audioFunctionality() {
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
    if (element) {
      if (
        element.classList.contains("violet") ||
        element.classList.contains("rojo") ||
        element.classList.contains("blanco") ||
        element.classList.contains("amarillo")
      ) {
        element.className = "";
      }
    }
  },

  /**
   * Crear div numero de bombas
   */
  crearDivNumBombas() {
    let container = document.getElementById("container");
    let div = document.createElement("div");
    div.id = "numBombas";
    div.innerHTML = `<img src="images/bomb.svg"/> ${buscaMinas.numMinas}`;
    container.appendChild(div);
  },
/**
   * Crear div numero de bombas
   */
  crearDivNumBanderas() {
    let container = document.getElementById("container");
    let div = document.createElement("div");
    div.id = "numBanderas";
    div.innerHTML = `<img src="images/flag.svg" height="30px"/> ${buscaMinas.numBanderas}`;
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

      if (localStorage.getItem(buscaMinas.nivel) !== null) {
        div.innerHTML = `<img src="images/record.svg" height="30px"/> ${localStorage.getItem(
          buscaMinas.nivel
        )}`;
      } else {
        div.innerHTML = `<img src="images/record.svg" height="30px"/> 0`;
      }

    container.appendChild(div);
  },

  /**
   * Comprueba el record y lo actualiza
   */
  comprobarRecord() {
    let tiempo = parseInt(document.querySelector("#timer p").textContent);

      if (localStorage.getItem(buscaMinas.nivel) === null) {
        localStorage.setItem(buscaMinas.nivel, tiempo);
      } else {
        if (
          localStorage.getItem(buscaMinas.nivel) === 0 ||
          localStorage.getItem(buscaMinas.nivel) > tiempo
        ) {
        }
      }
  },

  /**
   * Muestra el tiempo de partida
   */
  mostrarTiempoPartida() {
    let seconds = 0;

    let interv = setInterval(() => {
      if (!buscaMinas.flagFinPartida && !buscaMinas.flagGanado) {
        seconds++;
        time.textContent = seconds;
      } else {
        clearInterval(interv);
        if (buscaMinas.flagGanado) {
          buscaMinasGUI.comprobarRecord();
        }
      }
    }, 1000);
  },

  disableContextMenu() {
    if (document.addEventListener) {
      document.addEventListener(
        "contextmenu",
        function(e) {
          e.preventDefault();
        },
        false
      );
    } else {
      document.attachEvent("oncontextmenu", function() {
        window.event.returnValue = false;
      });
    }
  }
};

window.addEventListener("load", init);
