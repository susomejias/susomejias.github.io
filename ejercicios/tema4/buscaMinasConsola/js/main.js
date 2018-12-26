{
  let buscaMinas = {
    tablero: [],
    tablero2: [],
    tablero3: [],
    tableroPulsaciones: [],
    tableroBanderas: [],
    filas: 8,
    columnas: 8,
    numMinas: 10,

    /**
     * genera un campo de minas nuevo y lo muestra por consola.
     */
    init() {
      buscaMinas.generarTableros();
      buscaMinas.generaMinas();
      buscaMinas.numerosAlrededorMinas();
      buscaMinas.mostrar();
      buscaMinas.abrirTodasParaGanar();
      buscaMinas.comprobarSiGana();
    },

    mostrar() {
      console.table(buscaMinas.tablero);
      console.table(buscaMinas.tablero2);
    },
    /**
     * marca con una bandera la casilla(x, y) y muestra el campo de minas actualizado.
     */

    marcar(x, y) {
      try {
        if (
          buscaMinas.tablero[x][y] !== "" &&
          buscaMinas.tableroPulsaciones[x][y] !== "p"
        ) {
          buscaMinas.tableroBanderas[x][y] = "!";
          console.table(buscaMinas.tableroBanderas);
        } else {
          throw new Error(
            "No puedes colocar una bandera en una casilla descubierta"
          );
        }
      } catch (e) {
        console.clear();
        console.log(e.message);
      }
    },

    /**
     * intenta destapar las casillas colindantes, sólo si el número de banderas se * corresponden con las que indica la casilla. Entonces muestra el campo de minas actualizado.
     En caso de estar las banderas equivocadas se indica que se ha perdido el juego.
     Después se generará el entorno gráfico. Pero eso no entra en esta entrega.
     */

    //despejar(x, y) {},

    actualizaCambios() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroPulsaciones[i][j] === "p") {
            buscaMinas.tablero2[i][j] = buscaMinas.tablero[i][j];
          }
        }
      }
    },

    generarTableros() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        buscaMinas.tablero[i] = [];
        buscaMinas.tablero2[i] = [];
        buscaMinas.tablero3[i] = [];
        buscaMinas.tableroBanderas[i] = [];
        buscaMinas.tableroPulsaciones[i] = [];
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinas.tablero[i][j] = 0;
          buscaMinas.tablero2[i][j] = "";
          buscaMinas.tablero3[i][j] = 0;
          buscaMinas.tableroBanderas[i][j] = 0;
          buscaMinas.tableroPulsaciones[i][j] = 0;
        }
      }
    },
    generaMinas() {
      for (let i = 0; i < buscaMinas.numMinas; i++) {
        let fila = Math.floor(Math.random() * (buscaMinas.filas - 1 - 0)) + 0;
        let columna =
          Math.floor(Math.random() * (buscaMinas.columnas - 1 - 0)) + 0;

        while (buscaMinas.tablero[fila][columna] === "x") {
          fila = Math.floor(Math.random() * (buscaMinas.filas - 1 - 0)) + 0;
          columna =
            Math.floor(Math.random() * (buscaMinas.columnas - 1 - 0)) + 0;
        }

        buscaMinas.tablero[fila][columna] = "x";
        buscaMinas.tablero3[fila][columna] = "x";
      }
    },
    cargarPulsacion(x, y) {
      buscaMinas.tableroPulsaciones[x][y] = "p";
    },
    numerosAlrededorMinas() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tablero[i][j] === "x") {
            if (i == 0 && j == 0) {
              buscaMinas.cuentaMinas(i, j, i + 1, j + 1);
            } else if (i == 0 && (j > 0 && j < buscaMinas.numMinas - 1)) {
              buscaMinas.cuentaMinas(i, j - 1, i + 1, j + 1);
            } else if (i == 0 && j == buscaMinas.numMinas - 1) {
              buscaMinas.cuentaMinas(i, j - 1, i + 1, j);
            } else if (
              j == buscaMinas.numMinas - 1 &&
              (i > 0 && i < buscaMinas.numMinas - 1)
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i + 1, j);
            } else if (
              i == buscaMinas.numMinas - 1 &&
              j == buscaMinas.numMinas - 1
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i, j);
            } else if (
              i == buscaMinas.numMinas - 1 &&
              (j > 0 && j < buscaMinas.numMinas - 1)
            ) {
              buscaMinas.cuentaMinas(i - 1, j - 1, i, j + 1);
            } else if (i == buscaMinas.numMinas - 1 && j == 0) {
              buscaMinas.cuentaMinas(i - 1, j, i, j + 1);
            } else if (j == 0 && (i > 0 && i < buscaMinas.numMinas - 1)) {
              buscaMinas.cuentaMinas(i - 1, j, i + 1, j + 1);
            } else {
              buscaMinas.cuentaMinas(i - 1, j - 1, i + 1, j + 1);
            }
          }
        }
      }
    },
    cuentaMinas(ii, ij, fi, fj) {
      for (let i = ii; i <= fi; i++) {
        for (let j = ij; j <= fj; j++) {
          if (buscaMinas.tablero[i][j] !== "x") {
            if (buscaMinas.tablero[i][j] === 0) {
              buscaMinas.tablero[i][j] = 0 + 1;
              buscaMinas.tablero3[i][j] = 0 + 1;
            } else {
              buscaMinas.tablero[i][j] = parseInt(buscaMinas.tablero[i][j]) + 1;
              buscaMinas.tablero3[i][j] = parseInt(buscaMinas.tablero[i][j]);
            }
          }
        }
      }
    },
    obtenerNumeroCasillasPulsadas() {
      let contador = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroPulsaciones[i][j] === "p") contador++;
        }
      }
      return contador;
    },
    obtenerNumeroCasillasParaGanar() {
      let contador = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tablero[i][j] !== "x") contador++;
        }
      }
      return contador;
    },
    abrirCeros(x, y) {
      if (buscaMinas.tablero3[x][y] === 0) {
        buscaMinas.tablero3[x][y] = -1;
        if (buscaMinas.tablero[x][y] === 0) {
          for (
            let j = Math.max(x - 1, 0);
            j <= Math.min(x + 1, buscaMinas.filas - 1);
            j++
          )
            for (
              let k = Math.max(y - 1, 0);
              k <= Math.min(y + 1, buscaMinas.columnas - 1);
              k++
            ) {
              buscaMinas.cargarPulsacion(j, k);
              buscaMinas.abrirCeros(j, k);
            }
        }
      }
    },
    picar(i, j) {
      try {
        if (buscaMinas.tablero[i][j] === "x") {
          throw new Error("Pulsaste una mina");
        } else if (buscaMinas.tableroPulsaciones[i][j] === "p") {
          throw new Error("Esta casilla ya fue pulsada");
        } else {
          buscaMinas.abrirCeros(i, j);
          buscaMinas.cargarPulsacion(i, j);
          buscaMinas.actualizaCambios();

          console.table(buscaMinas.tablero);
          console.table(buscaMinas.tablero2);
          console.table(buscaMinas.tableroPulsaciones);
        }
      } catch (e) {
        if (e.message === "Pulsaste una mina") {
          /**
           * FIXME:
           * Arreglar proble con clear a la hora de mostrar mensaje
           */
          setInterval(function() {
            console.error(e.message);
            return;
          }, 3000);
          console.clear();
          buscaMinas.init();
        } else {
          console.error(e.message);
          console.clear();
        }
      }
    },
    comprobarSiGana() {
      try {
        if (
          buscaMinas.obtenerNumeroCasillasPulsadas() ===
          buscaMinas.obtenerNumeroCasillasParaGanar()
        ) {
          throw new Error("¡¡¡ Felicidades has ganado !!!");
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    abrirTodasParaGanar() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (
            buscaMinas.tablero[i][j] !== "x" &&
            buscaMinas.tablero2[i][j] !== "" &&
            buscaMinas.tableroPulsaciones[i][j] !== "p"
          )
            buscaMinas.picar(i, j);
        }
      }
    }
  };

  /**
   * Funciones publicas
   */
  var publicar = (function() {
    return {
      init: () => buscaMinas.init(),
      picar: (x, y) => buscaMinas.picar(x, y),
      marcar: (x, y) => buscaMinas.marcar(x, y)
    };
  })();

  function init() {
    publicar.init();
  }

  window.addEventListener("load", init);
}
