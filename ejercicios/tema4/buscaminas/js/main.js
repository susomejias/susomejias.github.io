/**
 * Juego buscaMinas en JS vanilla
 * @author Jesús Mejías Leiva
 */
{
  let containerTablero;
  let spanError;
  let timer;
  let elegirNivel;
  let silenciarAudio;
  let audio;

  let buscaMinas = {
    nivel: "principiante",
    finPartida: false,
    flagGanado: false,
    numMinas: 0,
    numCasillasNivel: 0,
    cambioNivel: false,
    numCambiosNivel: 0,
    resetTime: false,
    tableroCuentaMinas: [],


    /**
     * Actualiza el numero de casillas en función del nivel
     */
    numCasillasDependeNivel() {
      if (buscaMinas.nivel === "principiante") {
        buscaMinas.numCasillasNivel = 10;
      } else if (buscaMinas.nivel === "intermedio") {
        buscaMinas.numCasillasNivel = 16;
      }
    },

    crearDivRecord() {
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
    },
    /**
     * Inicia el juego según el nivel seleccionado en el select
     */
    actualizaNivel() {
      buscaMinas.numCambiosNivel++;

      if (buscaMinas.numCambiosNivel > 1) {
        buscaMinas.resetTime = true;
      }
      buscaMinas.nivel = this[this.selectedIndex].value;
      if (containerTablero.childElementCount === 0) {
        buscaMinas.iniciarJuego();
      } else {
        buscaMinas.eliminarTablero();
        buscaMinas.iniciarJuego();
      }

      buscaMinas.cambioNivel = true;
    },
    /**
     * Inicia la jugabilidad
     */
    iniciarJuego() {
      buscaMinas.numCasillasDependeNivel();
      buscaMinas.numMinasNivel();
      buscaMinas.generaTablero();
      buscaMinas.generarMinas();
      buscaMinas.compruebaMinas();
      buscaMinas.crearDivRecord();
      buscaMinas.crearDivTimer();
      buscaMinas.mostrarTiempoPartida();
    },
    /**
     * Comprueba si has ganado la partida
     */
    comprobarGanar() {
      let numCasillasSinDescubrirVerdes = 0;
      let numCasillasSinDescubrirRojas = 0;
      for (let k = 0; k < buscaMinas.numCasillasNivel; k++) {
        for (let f = 0; f < buscaMinas.numCasillasNivel; f++) {
          if (buscaMinas.obtenerValorCasilla(k, f).classList.contains("verde")){
            numCasillasSinDescubrirVerdes++;
          }

          if (buscaMinas.obtenerValorCasilla(k, f).classList.contains("rojo")){
            numCasillasSinDescubrirRojas++;
          }

        }
      }

      if (numCasillasSinDescubrirVerdes - 1 === buscaMinas.numMinas) {
        buscaMinas.flagGanado = true;
      }

      if (numCasillasSinDescubrirRojas - 1 === buscaMinas.numMinas) {
        buscaMinas.flagGanado = true;
      }
    },
    /**
     * Elimina los inputs del tablero
     */
    eliminarTablero() {
      let inputs = Array.from(document.getElementsByTagName("input"));

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].remove();
      }
    },
    /**
     * Comprueba el nivel y asigna el numero de Minas
     */

    numMinasNivel() {
      if (buscaMinas.nivel === "principiante") {
        buscaMinas.numMinas = 10;
        buscaMinas.numCasillas = 10 * 10;
      } else if (buscaMinas.nivel === "intermedio") {
        buscaMinas.numMinas = 40;
        buscaMinas.numCasillas = 16 * 16;
      }
    },
    crearDivTimer() {
      timer.innerHTML = `<img src="images/hourglass.svg" /><p id="time"></p>`;
      let time = document.getElementById("time");
    },
    /**
     * Acciones que realizaremos tras pulsar una mina
     */
    accionTrasPerderGanar(that, color, mensaje) {
      buscaMinas.crearBotonJugarDeNuevo();
      buscaMinas.mostrarMinas();
      buscaMinas.eliminarEventoInput();
      that.style.background = color;
      spanError.textContent = mensaje;
    },
    /**
     * Reliza una función u otra al pulsar en una casilla
     */

    comprobarCasilla() {
      // cuando el fondo sea diferente de rojo

      if (this.classList.contains("rojo")) {
        return;
      }
      this.classList.add("selectionGreen");
      this.classList.remove("selectionRed");
      if (this.value === "x") {
        buscaMinas.accionTrasPerderGanar(this,"#FFEB3B","Pulsaste una mina, perdiste");
        buscaMinas.finPartida = true;
      } else {
        let coordenada = this.getAttribute("id").split("-");
        console.log(coordenada);
        this.classList.remove("verde");
          this.classList.remove("rojo");
          this.classList.add("blanco");
        if (!buscaMinas.flagGanado) {
          
          buscaMinas.comprobarGanar();
          buscaMinas.abrirCeros(
            parseInt(coordenada[0]),
            parseInt(coordenada[1])
          );
        }else{
          buscaMinas.accionTrasPerderGanar(this,"#FFF","Felicidades ganaste");
        }
      }
    },
    /**
     * Muestra los segundos que llevas jugados en la partida
     */
    mostrarTiempoPartida() {
      let seconds = 0;

      let interv = setInterval(() => {
        if (
          !buscaMinas.finPartida &&
          !buscaMinas.flagGanado &&
          !buscaMinas.resetTime
        ) {
          seconds++;
          time.textContent = seconds;
        } else {
          buscaMinas.resetTime = false;
          clearInterval(interv);
          if (buscaMinas.flagGanado) {
            buscaMinas.comprobarRecord();
          }
        }
      }, 1000);
    },
    /**
     * Descubre las Minas del tablero
     */

    mostrarMinas() {
      for (let i = 0; i < buscaMinas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaMinas.numCasillasNivel; j++) {
          if (buscaMinas.obtenerValorCasilla(i, j).value === "x") {
            buscaMinas.obtenerValorCasilla(i, j).style.background = "#FFEB3B";
          }
        }
      }
    },
    /**
     * Elimina los eventos click de los inputs
     */
    eliminarEventoInput() {
      let inputs = document.getElementsByTagName("input");
      Array.from(inputs).forEach(element => {
        element.removeEventListener("click", buscaMinas.comprobarCasilla);
      });
    },
    /**
     * Crear el boton de jugar de nuevo cuando pierdes la partida
     */

    crearBotonJugarDeNuevo() {
      if (!buscaMinas.finPartida) {
        let main = document.getElementsByTagName("main")[0];
        let btnVolverJugar = document.createElement("button");
        btnVolverJugar.id = "btnVolverJugar";
        btnVolverJugar.textContent = "Volver a jugar";
        main.appendChild(btnVolverJugar);
        btnVolverJugar.addEventListener("click", () => location.reload());
      }
    },
    /**
     * Inserta el número de Minas que hay alrededor de la casilla pulsada
     * @param ii indice de inicio para la fila
     * @param ij indice de inicio para la columna
     * @param fi indice de fin para la fila
     * @param fj indice de fin para la columna
     */

    cuentaMinas(ii, ij, fi, fj) {
      for (let i = ii; i <= fi; i++) {
        for (let j = ij; j <= fj; j++) {
          if (buscaMinas.obtenerValorCasilla(i, j).value !== "x") {
            if (buscaMinas.obtenerValorCasilla(i, j).value === "0") {
              buscaMinas.obtenerValorCasilla(i, j).value = 0 + 1;
            } else {
              buscaMinas.obtenerValorCasilla(i, j).value =
                parseInt(buscaMinas.obtenerValorCasilla(i, j).value) + 1;
            }
          }
        }
      }
    },
    /**
     * Devulelve la casilla pulsada
     * @param i indice para la fila
     * @param j indice para la columna
     * @returns elemento pulsado
     */

    obtenerValorCasilla(i, j) {
      return document.getElementById(i + "-" + j);
    },
    /**
     * Cuenta el número de Minas que hay alrededor de la casilla pulsada
     */
    compruebaMinas() {
      for (let i = 0; i < buscaMinas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaMinas.numCasillasNivel; j++) {
          if (buscaMinas.obtenerValorCasilla(i, j).value === "x") {
            if (i == 0 && j == 0) {
              buscaMinas.cuentaMinas(i, j, i + 1, j + 1);
            } else if (
              i == 0 &&
              (j > 0 && j < buscaMinas.numCasillasNivel - 1)
            ) {
              buscaMinas.cuentaMinas(i, j - 1, i + 1, j + 1);
            } else if (i == 0 && j == buscaMinas.numCasillasNivel - 1) {
              buscaMinas.cuentaMinas(i, j - 1, i + 1, j);
            } else if (
              j == buscaMinas.numCasillasNivel - 1 &&
              (i > 0 && i < buscaMinas.numCasillasNivel - 1)
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i + 1, j);
            } else if (
              i == buscaMinas.numCasillasNivel - 1 &&
              j == buscaMinas.numCasillasNivel - 1
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i, j);
            } else if (
              i == buscaMinas.numCasillasNivel - 1 &&
              (j > 0 && j < buscaMinas.numCasillasNivel - 1)
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i, j + 1);
            } else if (i == buscaMinas.numCasillasNivel - 1 && j == 0) {
              buscaMinas.cuentaMinas(i - 1, j, i, j + 1);
            } else if (
              j == 0 &&
              (i > 0 && i < buscaMinas.numCasillasNivel - 1)
            ) {
              buscaMinas.cuentaMinas(i - 1, j, i + 1, j + 1);
            } else {
              buscaMinas.cuentaMinas(i - 1, j - 1, i + 1, j + 1);
            }
          }
        }
      }
    },
    /**
     * Genera un numero de Minas en el tablero según el nivel
     */

    generarMinas() {
      for (let i = 0; i < buscaMinas.numMinas; i++) {
        let fila =
          Math.floor(Math.random() * (buscaMinas.numCasillasNivel - 1 - 0)) + 0;
        let columna =
          Math.floor(Math.random() * (buscaMinas.numCasillasNivel - 1 - 0)) + 0;

        while (buscaMinas.obtenerValorCasilla(fila, columna).value === "x") {
          fila =
            Math.floor(Math.random() * (buscaMinas.numCasillasNivel - 1 - 0)) +
            0;
          columna =
            Math.floor(Math.random() * (buscaMinas.numCasillasNivel - 1 - 0)) +
            0;
        }

        //buscaMinas.tableroConCuentaMinas[fila][columna] = "x";
        buscaMinas.obtenerValorCasilla(fila, columna).value = "x";
      }
    },
    /**
     * Cambia el color de fondo a rojo para indicar una bandera
     */
    colocarBandera(ev) {
      ev.preventDefault(); // quitar color selection

      if (ev.button === 2 && this.classList.contains("verde")) {
        this.classList.remove("verde");
        this.classList.add("rojo");
      } else if (ev.button === 2 && this.classList.contains("rojo")) {
        this.classList.remove("rojo");
        this.classList.add("verde");
      }
    },
    /**
     * Genera un tablero html, segun el numero de casillas
     */

    generaTablero() {
      containerTablero.style.display = "grid";
      containerTablero.style.gridTemplateColumns =
        "repeat(" + buscaMinas.numCasillasNivel + ", 1fr)";

      for (let i = 0; i < buscaMinas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaMinas.numCasillasNivel; j++) {
          let input = document.createElement("input");
          input.id = i + "-" + j;
          input.value = "0";
          input.readOnly = "true";
          input.addEventListener("click", buscaMinas.comprobarCasilla);
          //input.addEventListener("contextmenu", () => false);
          input.addEventListener("mousedown", buscaMinas.colocarBandera);
          input.classList.add("verde");
          containerTablero.appendChild(input);
        }
      }
    },
    comprobarRecord() {
      let tiempo = parseInt(document.querySelector("#timer p").textContent);

      if (buscaMinas.nivel === "principiante") {
        if (localStorage.getItem("recordPrincipiante") === null) {
          localStorage.setItem("recordPrincipiante", tiempo);
        } else {
          if (
            localStorage.getItem("recordPrincipiante") === 0 ||
            localStorage.getItem("recordPrincipiante") > tiempo
          ) {
            localStorage.setItem("recordPrincipiante", tiempo);
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
      }
    },
    /**
     * Función para abrir casillas recursivamente
     * @param x coordenada para la fila
     * @param y coordenada para la columna
     */

    abrirCeros(x, y) {
      if (buscaMinas.obtenerValorCasilla(x, y).value === "0") {
        buscaMinas.obtenerValorCasilla(x, y).value = "";
        for (
          let j = Math.max(x - 1, 0);
          j <= Math.min(x + 1, buscaMinas.numCasillasNivel - 1);
          j++
        ) {
          for (
            let k = Math.max(y - 1, 0);
            k <= Math.min(y + 1, buscaMinas.numCasillasNivel - 1);
            k++
          ) {
            document.getElementById(j + "-" + k).classList.remove("verde");
            document.getElementById(j + "-" + k).classList.remove("rojo");
            document.getElementById(j + "-" + k).classList.add("blanco");
            buscaMinas.abrirCeros(j, k);
          }
        }
      }
    }
  };

  function init() {
    // desactivar contextmenu, solo funciona en firefox
    window.oncontextmenu = function() {
      return false;
    };
    
    containerTablero = document.getElementById("containerTablero");
    spanError = document.getElementById("spanError");
    timer = document.getElementById("timer");
    elegirNivel = document.getElementById("elegirNivel");
    silenciarAudio = document.getElementById("silenciarAudio");
    audio = document.getElementById("audio");

    elegirNivel.addEventListener("change", buscaMinas.actualizaNivel);
    silenciarAudio.addEventListener("click", () => {
      audio.muted = !audio.muted;
      if (audio.muted) {
        silenciarAudio.src = "./images/volumenOff.svg";
      } else {
        silenciarAudio.src = "./images/volumenOn.svg";
      }
    });
  }

  window.addEventListener("load", init);
}
