/**
 * Juego buscaminas en JS vanilla
 * @author Jesús Mejías Leiva
 */
{
  let containerTablero;
  let spanError;
  function init() {
    containerTablero = document.getElementById("containerTablero");
    spanError = document.getElementById("spanError");

    buscaminas.generaTablero();
    buscaminas.generarBombas();
    console.log(buscaminas.obtenerNumeroDeBombas());
  }

  let buscaminas = {
    nivel: "intermedio",
    /**
     * Genera una tabla en html, que nos sirve como el tablero del juego
     */
    generaTablero() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraTablero(8);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraTablero(10);
      }
    },
    /**
     * Reliza una función u otra al pulsar en una casilla
     */
    comprobarCasilla() {
      if (this.value === "x") {
        this.style.background = "#FF8A80";
        spanError.textContent = "Pulsaste una mina, perdiste";
      } else {
        buscaminas.compruebaBombas();
      }
    },
    /**
     * invoca al método funcionalidadGeneraBombas(), y le pasa un número de casillas según el nivel
     */
    generarBombas() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraBombas(8);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraBombas(10);
      }
    },
    /**
     * Devuelve el número de bombas que hay en el tablero
     * @returns numero de bombas del tablero
     */
    obtenerNumeroDeBombas() {
      let casillas = document.querySelectorAll("input");
      let bombas = [];

      for (casilla of casillas) {
        if (casilla.value === "x") {
          bombas.push(casilla);
        }
      }

      return bombas.length;
    },
    /**
     * invoca al método funcionalidadCuentaBombas(), y le pasa un número de casillas según el nivel
     */
    compruebaBombas() {
      //console.log(coordenadaPulsada, casilla);

      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadCuentaBombas(8);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadCuentaBombas(10);
      }

      //console.log(tablero[0].getAttribute("id"));
    },
    /**
     * Inserta el número de bombas que hay alrededor de la casilla pulsada
     * @param ii indice de inicio para la fila
     * @param ij indice de inicio para la columna
     * @param fi indice de fin para la fila
     * @param fj indice de fin para la columna
     */
    cuentaBombas(ii, ij, fi, fj) {
      for (let i = ii; i <= fi; i++) {
        for (let j = ij; j <= fj; j++) {
          if (buscaminas.obtenerValorCasilla(i, j).value !== "x") {
            buscaminas.obtenerValorCasilla(i, j).value =
              parseInt(buscaminas.obtenerValorCasilla(i, j).value) + 1;
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
     * Cuenta el número de bombas que hay alrededor de la casilla pulsada
     */
    funcionalidadCuentaBombas(casillasNivel) {
      for (let i = 0; i < casillasNivel; i++) {
        for (let j = 0; j < casillasNivel; j++) {
          if (buscaminas.obtenerValorCasilla(i, j).value === "x") {
            if (i == 0 && j == 0) {
              buscaminas.cuentaBombas(i, j, i + 1, j + 1);
            } else if (i == 0 && (j > 0 && j < casillasNivel - 1)) {
              buscaminas.cuentaBombas(i, j - 1, i + 1, j + 1);
            } else if (i == 0 && j == casillasNivel - 1) {
              buscaminas.cuentaBombas(i, j - 1, i + 1, j);
            } else if (
              j == casillasNivel - 1 &&
              (i > 0 && i < casillasNivel - 1)
            ) {
              buscaminas.cuentaBombas(i - 1, j - 1, i + 1, j);
            } else if (i == casillasNivel - 1 && j == casillasNivel - 1) {
              buscaminas.cuentaBombas(i - 1, j - 1, i, j);
            } else if (
              i == casillasNivel - 1 &&
              (j > 0 && j < casillasNivel - 1)
            ) {
              buscaminas.cuentaBombas(i - 1, j - 1, i, j + 1);
            } else if (i == casillasNivel - 1 && j == 0) {
              buscaminas.cuentaBombas(i - 1, j, i, j + 1);
            } else if (j == 0 && (i > 0 && i < casillasNivel - 1)) {
              buscaminas.cuentaBombas(i - 1, j, i + 1, j + 1);
            } else {
              buscaminas.cuentaBombas(i - 1, j - 1, i + 1, j + 1);
            }
          }
        }
      }
    },
    /**
     * Genera un numero de bombas en el tablero según el nivel
     * @param casillasNivel numero de casillas según el nivel
     */
    funcionalidadGeneraBombas(casillasNivel) {
      for (let i = 0; i < casillasNivel; i++) {
        let fila = Math.floor(Math.random() * (casillasNivel - 1 - 0)) + 0;
        let columna = Math.floor(Math.random() * (casillasNivel - 1 - 0)) + 0;

        while (buscaminas.obtenerValorCasilla(fila, columna).value === "x") {
          fila = Math.floor(Math.random() * (casillasNivel - 1 - 0)) + 0;
          columna = Math.floor(Math.random() * (casillasNivel - 1 - 0)) + 0;
        }

        buscaminas.obtenerValorCasilla(fila, columna).value = "x";
      }
    },
    /**
     * Genera un tablero html, segun el numero de casillas pasadas por parámetro
     * @param casillasNivel numero de casillas según el nivel
     */
    funcionalidadGeneraTablero(casillasNivel) {
      containerTablero.style.display = "grid";
      containerTablero.style.gridTemplateColumns =
        "repeat(" + casillasNivel + ", 1fr)";

      for (let i = 0; i < casillasNivel; i++) {
        for (let j = 0; j < casillasNivel; j++) {
          let celda = document.createElement("input");
          celda.id = i + "" + j;
          celda.value = "0";
          celda.readOnly = "readonly";
          celda.addEventListener("click", buscaminas.comprobarCasilla);
          celda.style.background = "#263238";
          containerTablero.appendChild(celda);
        }
      }
    }
  };

  window.addEventListener("load", init);
}
