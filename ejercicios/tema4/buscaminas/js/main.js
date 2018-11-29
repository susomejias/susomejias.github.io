/**
 * Juego buscaMinas en JS vanilla
 * @author Jesús Mejías Leiva
 */
{
  let containerTablero;
  let spanError;
  let timer;
  let elegirNivel;

  let buscaMinas = {
    nivel: "principiante",
    finPartida: false,
    flagGanado: false,
    numMinas: 0,
    numCasillasNivel: 0,
    cambioNivel: false,

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
      if (localStorage.getItem("record") !== null) {
        div.textContent = `Record: ${localStorage.getItem("record")}`;
      } else {
        div.textContent = `Record: 0`;
      }
      container.appendChild(div);
    },
    /**
     * Inicia el juego según el nivel seleccionado en el select
     */
    actualizaNivel() {
      if (!buscaMinas.cambioNivel) {
        buscaMinas.mostrarTiempoPartida();
      }
      buscaMinas.nivel = this[this.selectedIndex].value;
      if (containerTablero.childElementCount === 0) {
        buscaMinas.iniciarJuego();
      } else {
        buscaMinas.eliminarTablero();
        buscaMinas.iniciarJuego();
      }
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
      //buscaMinas.mostrarTiempoPartida();
    },
    /**
     * Comprueba si has ganado la partida
     */
    comprobarGanar() {
      let numCasillasSinDescubrir = 0;
      for (let k = 0; k < buscaMinas.numCasillasNivel; k++) {
        for (let f = 0; f < buscaMinas.numCasillasNivel; f++) {
          //console.log(buscaMinas.obtenerValorCasilla(k,f).style.background);

          if (
            buscaMinas.obtenerValorCasilla(k, f).style.background ===
            "rgb(124, 179, 66)"
          ) {
            numCasillasSinDescubrir++;
          }
        }
      }

      if (numCasillasSinDescubrir - 1 === buscaMinas.numMinas) {
        buscaMinas.flagGanado = true;
        //buscaMinas.pararContadorTiempo();
        //buscaMinas.comprobarRecord();
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
    accionTrasPerder(that) {
      buscaMinas.mostrarMinas();
      that.style.background = "#FFEB3B";
      spanError.textContent = "Pulsaste una mina, perdiste";
      buscaMinas.finPartida = true;
      buscaMinas.crearBotonJugarDeNuevo();
    },
    /**
     * Reliza una función u otra al pulsar en una casilla
     */

    comprobarCasilla() {
      if (this.value === "x" && !buscaMinas.flagGanado) {
        buscaMinas.accionTrasPerder(this);
      } else {
        let coordenada = this.getAttribute("id");

        let flag = true;
        if ((!buscaMinas.flagGanado && flag) || flag)
          this.style.background = "#fff";

        if (buscaMinas.flagGanado) {
          spanError.textContent = "Has ganado";
          buscaMinas.eliminarEventoInput();
          buscaMinas.mostrarMinas();
        }

        if (coordenada.length === 2) {
          buscaMinas.comprobarGanar();
          buscaMinas.abrirCeros(
            parseInt(coordenada[0]),
            parseInt(coordenada[1])
          );
        } else {
          buscaMinas.comprobarGanar();
          buscaMinas.abrirCeros(
            parseInt(coordenada[0] + "" + coordenada[1]),
            parseInt(coordenada[2] + "" + coordenada[3])
          );
        }
      }
    },
    /**
     * Muestra los segundos que llevas jugados en la partida
     */
    mostrarTiempoPartida() {
      let seconds = 0;
      let interv = setInterval(() => {
        if (!buscaMinas.finPartida && !buscaMinas.flagGanado) {
          seconds++;
          time.textContent = seconds;
        } else {
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
          } else {
            buscaMinas.obtenerValorCasilla(i, j).style.background = "#FFFF";
            if (buscaMinas.obtenerValorCasilla(i, j).value === "0") {
              buscaMinas.obtenerValorCasilla(i, j).value = "";
            }
          }
        }
      }
    },
    /**
     * Elimina los eventos click de los inputs
     */
    eliminarEventoInput() {
      let inputs = document.getElementsByTagName("input");
      if (buscaMinas.finPartida || buscaMinas.flagGanado) {
        Array.from(inputs).forEach(element => {
          element.removeEventListener("click", buscaMinas.comprobarCasilla);
        });
      }
    },
    /**
     * Crear el boton de jugar de nuevo cuando pierdes la partida
     */

    crearBotonJugarDeNuevo() {
      let main = document.getElementsByTagName("main")[0];
      let btnVolverJugar = document.createElement("button");
      btnVolverJugar.id = "btnVolverJugar";
      btnVolverJugar.textContent = "Volver a jugar";
      main.appendChild(btnVolverJugar);
      btnVolverJugar.addEventListener("click", () => location.reload());
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
      return document.getElementById(i + "" + j);
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

        buscaMinas.obtenerValorCasilla(fila, columna).value = "x";
      }
    },
    /**
     * Cambia el color de fondo a rojo para indicar una bandera
     */
    colocarBandera(ev) {
      //console.log(this.style.background);
      if (ev.button === 2 && this.style.background === "rgb(124, 179, 66)") {
        this.style.background = "#F44336";
      } else if (
        ev.button === 2 &&
        this.style.background === "rgb(244, 67, 54)"
      ) {
        this.style.background = "#7CB342";
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
          input.id = i + "" + j;
          input.value = "0";
          input.readOnly = "true";
          input.addEventListener("click", buscaMinas.comprobarCasilla);
          input.addEventListener("mousedown", buscaMinas.colocarBandera);
          //input.style.background = "#7CB342";
          input.style.background = "#7CB342";
          input.style.color = "#9CCC65";
          containerTablero.appendChild(input);
        }
      }

      for (var k = 1; k <= buscaMinas.numCasillasNivel; k++) {
        for (var f = 1; f <= buscaMinas.numCasillasNivel; f++) {
          if (k % 2 === 0 && f % 2 === 0) {
            // buscaMinas.obtenerValorCasilla(k - 1, f - 1).style.background =
            //    "#9CCC65";
            // buscaMinas.obtenerValorCasilla(k - 1, f - 1).style.color =
            //   "#9CCC65";
          } else if (k % 2 !== 0 && f % 2 !== 0) {
            //  buscaMinas.obtenerValorCasilla(k - 1, f - 1).style.background =
            //    "#9CCC65";
            // buscaMinas.obtenerValorCasilla(k - 1, f - 1).style.color =
            //   "#9CCC65";
          }
        }
      }
    },
    comprobarRecord() {
      let tiempo = parseInt(document.querySelector("#timer p").textContent);

      if (localStorage.getItem("record") === null) {
        localStorage.setItem("record", tiempo);
      } else {
        //console.log(tiempo);
        if (
          localStorage.getItem("record") === 0 ||
          localStorage.getItem("record") > tiempo
        ) {
          localStorage.setItem("record", tiempo);
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
            document.getElementById(j + "" + k).style.background = "#fff";

            buscaMinas.abrirCeros(j, k);
          }
        }
      }
    }
  };

  function init() {
    containerTablero = document.getElementById("containerTablero");
    spanError = document.getElementById("spanError");
    timer = document.getElementById("timer");
    elegirNivel = document.getElementById("elegirNivel");

    elegirNivel.addEventListener("change", buscaMinas.actualizaNivel);
  }

  window.addEventListener("load", init);
}
