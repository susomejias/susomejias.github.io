/**
 * Módulo GUI para el juego buscaminas
 * @author Jesús Mejías Leiva
 */
import { buscaMinas } from "./main.js";

let $container;
let $containerTablero;
let $timer;
let $time;

let init = function() {
  $("#elegirNivel").change(buscaMinasGUI.initJuego);
  $("#instrucciones").click(buscaMinasGUI.abrirInstrucciones);

  $container = $("#container");
  $containerTablero = $("#containerTablero");
  $timer = $("#timer");
  $time = $("time");

  $container.addClass("shadowMaterialButton");
};

let buscaMinasGUI = {
  flagRecord: false,

  /**
   * Inicia el juego GUI
   */
  initJuego() {
    buscaMinas.nivel = $(this).val();
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
    $container.css("width", "100%");
    $container.css("border-bottom", "2px solid #6A1B9A");

    $("#btnVolverAjugar").addClass("shadowMaterialButton");
    $("#timer").css("min-width", "80px");

    $containerTablero.addClass("shadowMaterial").css("min-width", "100%");
  },
  /**
   * Genera el tablero GUI
   */
  generarTableroGui() {
    $containerTablero.css({
      "display": "grid",
      "grid-template-columns": "repeat(" + buscaMinas.columnas + ", 1fr)",
      "with": "100%"
    });

    let $fragment = $(document.createDocumentFragment());
    for (let i = 0; i < buscaMinas.filas; i++) {
      for (let j = 0; j < buscaMinas.columnas; j++) {
        let $input = $(`<input type='text' id='${i}-${j}' readOnly></input>`);

        buscaMinasGUI.claseSegunNivel("violet", $input);

        $input.click(function(ev,) {
          buscaMinasGUI.picarGui(ev,$(this));
        });

        $input.mousedown(function(ev) {
          switch (ev.buttons) {
            case 2:
                buscaMinasGUI.marcarGui(ev,$(this));
              break;
            case 3:
                buscaMinasGUI.despejarGui(ev,$(this));
              break;
            default:

          }

        });
        $fragment.append($input)

      }
    }

    $containerTablero.append($fragment);
  },
  /*
  * Añade animaciones al input pasado por parámetro.
  * @param input elemento DOM.
  * @param classs clase css que contiene la animación.
  * @param animationViolet animación que se le añadirá a los input violet.
  * @param animationOthers animación que se le añadirá a los input que no sean violet.
  * @param nivel nivel actual de la partida.
  */
  animationInput(input,classs,animationViolet,animationOthers, nivel){

    if (classs === "violet"){
      buscaMinasGUI.limpiarClasesCss(input)
      input.addClass('animated ' + animationViolet + ' faster ' + nivel + ' ' + classs );
    }else{
      buscaMinasGUI.limpiarClasesCss(input)
      input.addClass('animated ' + animationOthers + ' faster ' + nivel + ' ' + classs);
    }
  },
  /**
   * Clases según el nivel
   * @param classs clase que se le añadirá al input
   * @param input elemento al cuál se le añadirá la clase
   */
  claseSegunNivel(classs, input, delay) {
    switch (buscaMinas.nivel) {
      case "facil":
          buscaMinasGUI.animationInput(input,classs,"zoomIn", "jackInTheBox " + delay, "inputFacil")
        break;

      case "intermedio":
              buscaMinasGUI.animationInput(input,classs,"zoomIn", "jackInTheBox " + delay, "inputIntermedio")
        break;

      case "experto":
            buscaMinasGUI.animationInput(input,classs,"zoomIn", "jackInTheBox " + delay, "inputExperto")
        break;

      default:
        break;
    }
  },
  /**
   * Despeja las casilla colindantes si el numero de banderas coincide con el valor de la casilla
   * @param ev evento
   * @param element elemento DOM
   */
  despejarGui(ev,element) {
    let $fila = parseInt(element.prop("id").split("-")[0]);
    let $columna = parseInt(element.prop("id").split("-")[1]);
    try {
        buscaMinas.despejar($fila, $columna);
        buscaMinasGUI.actualizarGui();
    } catch (e) {
      buscaMinasGUI.descubrirMinas();
      if (e.message === "¡¡¡ Felicidades has ganado !!!") {
        setTimeout(function(){
          buscaMinasGUI.swalVolverAJugar(e.message, "success");
        }, 4000);
      } else {
        setTimeout(function(){
          buscaMinasGUI.swalVolverAJugar(e.message, "error");
        }, 4000);

      }
    }
  },
  /**
   * Actualiza la GUI con los valores del tablero visible interno
   */
  actualizarGui() {
    if (buscaMinas.flagFinPartida || buscaMinas.flagGanado) {
      buscaMinasGUI.descubrirMinas();
      return;
    }else{
      let cont = 0;
      for (const item of buscaMinas.aperturaCasillas) {
        cont++;
        let fila = item.split("-")[0];
        let columna = item.split("-")[1];

        let $element = $("#" + fila +"-"+ columna)

          buscaMinasGUI.limpiarClasesCss($element);

              if (
                buscaMinas.tableroVisible[fila][columna] !== "!" &&
                buscaMinas.tableroVisible[fila][columna] !== "#"
              ) {
                if (buscaMinas.tableroVisible[fila][columna] === 0) {
                  $element.val("");
                }else{
                   $element.val(buscaMinas.tableroVisible[fila][columna]);
                 };

                 buscaMinasGUI.claseSegunNivel(
                   "blanco",
                   $element,
                   "delay-" + cont + "s"
                 );


                 if (cont === 1){
                   buscaMinasGUI.reproducirAudio("abrir.mp3");
                 }

              }


      }

      buscaMinas.aperturaCasillas.clear(); // vacío la collection con las coordenadas
    }


   },
  /**
   * Realiza la accion de picar y actualiza la GUI
   * @param ev evento
   * @param element elemento DOM
   */
  picarGui(ev, element) {

    let $fila = parseInt(element.prop("id").split("-")[0]);
    let $columna = parseInt(element.prop("id").split("-")[1]);

      try {
          buscaMinas.picar($fila, $columna);
          if (buscaMinas.flagGanado) {
            buscaMinasGUI.comprobarRecord();
          }

          buscaMinasGUI.actualizarGui();
      } catch (e) {
        buscaMinasGUI.descubrirMinas();
        if (e.message === "¡¡¡ Felicidades has ganado !!!") {
          setTimeout(function(){
            buscaMinasGUI.swalVolverAJugar(e.message, "success");
          }, 4000);
        } else {
          buscaMinasGUI.reproducirAudio("explosion.mp3");

          setTimeout(function(){
            buscaMinasGUI.swalVolverAJugar(e.message, "error");
          }, 4000);


        }
      }
  },
  /**
   * Realiza la accion de picar y actualiza la GUI
   * @param ev evento
   * @param i coordenada para la fila
   * @param j coordenada para la columna
   */
  marcarGui(ev,element) {
    buscaMinasGUI.disableContextMenu();
    let $fila = parseInt(element.prop("id").split("-")[0]);
    let $columna = parseInt(element.prop("id").split("-")[1]);

    try {
        buscaMinas.marcar($fila, $columna);
        if (buscaMinas.tableroVisible[$fila][$columna] === "!" ){
          buscaMinasGUI.reproducirAudio("flag.mp3");
          buscaMinasGUI.claseSegunNivel(
            "amarillo",
            element
          )
        }else if (buscaMinas.tableroPulsaciones[$fila][$columna] !== "p"){
              buscaMinasGUI.claseSegunNivel(
                "violet",
                      element
              )
        }
        // actualizo el numero de banderas

        if ($("#pNumBanderas")){
           $("#pNumBanderas").text(`${buscaMinas.numBanderas}`)
        }

        if (buscaMinas.flagGanado) {
          buscaMinasGUI.comprobarRecord();
        }
    } catch (e) {
      buscaMinasGUI.descubrirMinas();
      if (e.message === "¡¡¡ Felicidades has ganado !!!") {
        buscaMinasGUI.swalVolverAJugar(e.message, "success");
      } else {
        buscaMinasGUI.reproducirAudio("explosion.mp3");
        buscaMinasGUI.swalVolverAJugar(e.message, "error");
      }
    }
  },
  /**
   * Carga la librería sweetalert para preguntar si desea jugar de nuevo
   * @param msg mensaje a mostra
   * @param icon icono que mostrará la ventana
   */
  swalVolverAJugar(msg, icon) {

    let tiempoPartida = parseInt($("#timer #time").text());
    let recordNivel = buscaMinasGUI.obtenerRecordActualNivel();

    let message = "";
    let title = msg;

    if (icon === "success") {
      message = `Tu tiempo en esta partida a sido ${tiempoPartida} segundo/s. \n \n El record actual es de ${recordNivel} segundo/s.\n \n`;
    }
    if (
      icon === "success" &&
      (recordNivel === 0 || tiempoPartida < recordNivel)
    ) {
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
    }).then(result => {
      if (result === "Si") {
        location.reload();
      }
    });
  },
  obtenerRecordActualNivel() {
    if (localStorage.getItem(buscaMinas.nivel) !== null) {
      return parseInt(localStorage.getItem(buscaMinas.nivel));
    } else {
      return 0;
    }
  },
  /**
   * Descubre las minas
   */
  descubrirMinas() {
    buscaMinas.descubrirMinas();
    let cont = 0;

    for (let mina of buscaMinas.apeturaMinas) {
      cont++;
      let $element = $("#" + mina);
      buscaMinasGUI.claseSegunNivel(
        "rojo",
        $element,
        "delay-" + cont + "s"
      );
    }
  },
  /**
   * Crea un boton para volver a jugar
   */
  volverAjugar() {
    let $btnVolverAjugar = $("<button id='btnVolverAjugar'>Volver a jugar</button>");
    $("#tools").append($btnVolverAjugar);

    $("#btnVolverAjugar").click(()=> {
      // reseteamos el select
      $("#elegirNivel").val("");
      location.reload();
    });
  },
  /**
   * Limpia las clases del elemento pasado por parametro
   * @param element elemento del DOM
   */
  limpiarClasesCss(element) {
    if (element) {
      if (
        element.hasClass("violet") ||
        element.hasClass("rojo") ||
        element.hasClass("blanco") ||
        element.hasClass("amarillo")
      ) {
        element.prop("class", "");
      }
    }
  },
  /**
   * Crear div numero de bombas
   */
  crearDivNumBombas() {
    let $div = $("<div></div>");
    $div.prop("id","numBombas" );
    $div.html(`<img src="images/bomb.svg"/> ${buscaMinas.numMinas}`);
    $container.append($div);
  },
  /**
   * Crear div numero de bombas
   */
  crearDivNumBanderas() {
    let $div = $("<div></div>");
    $div.prop("id","numBanderas" );
    $div.html(`<img src="images/flag.svg" height="30px"/><p id="pNumBanderas">${
      buscaMinas.numBanderas
    }</p>`);
    $container.append($div);
  },
  /**
   * Crear div para el timer
   */
  crearDivTimer() {
    $timer.html(`<img src="images/hourglass.svg" /><p id="time"></p>`);
    $time = $("#time");
  },
  /**
   * Crea los divs para el record y el tiempo
   */
  crearDivRecord() {
    buscaMinasGUI.crearDivTimer();
    if ($("#record")) {
      $("#record").remove();
    }
    let $container = $("#container");
    let $div = $("<div></div>");
    $div.prop("id", "record");
    $time.html(`<div id="record"></div>`);

    if (localStorage.getItem(buscaMinas.nivel) !== null) {
      $div.html(`<img src="images/record.svg" height="30px"/> ${localStorage.getItem(
        buscaMinas.nivel
      )}`);
    } else {
      $div.html(`<img src="images/record.svg" height="30px"/> 0`);
    }

    $container.append($div);
  },
  /**
   * Comprueba el record y lo actualiza
   */
  comprobarRecord() {
    let tiempo = parseInt($("#timer p").text());

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
    if ($(document).on()) {
      $(document).contextmenu(function(e) {
        e.preventDefault();
      },
      false);
    } else {
      $(document).attachEvent("oncontextmenu", function() {
        $(window).event.returnValue = false;
      });
    }
  },
  reproducirAudio(file){
    let $reproducir = new Audio();
    $reproducir.src = "./sounds/" + file;
    $reproducir.play();
  }

};

$(init);
