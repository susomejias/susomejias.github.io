{
  let buscaMinas = {
    tableroMaster: [],
    tableroCopiaMaster: [],
    tableroVisible: [],
    tableroPulsaciones: [],
    filas: 2,
    columnas: 2,
    numMinas: 1,

    /**
     * Genera la funcionalidad
     */
    init() {
      buscaMinas.generarTableros();
      buscaMinas.generaMinas();
      buscaMinas.numerosAlrededorMinas();
      buscaMinas.mostrar();
    },
    /**
     * Muestra los tableros al inicio
     */
    mostrar() {
      console.log("Tablero master \n");
      console.table(buscaMinas.tableroMaster);
      console.log("Tablero visible \n");
      console.table(buscaMinas.tableroVisible);
    },
    /**
     * Marca y desmarca una casilla con una bandera
     * @param x cordenada para la fila
     * @param y coordenada para la columna
     */
    marcar(x, y) {
      try {
        if (
          buscaMinas.tableroPulsaciones[x][y] !== "p" &&
          buscaMinas.tableroVisible[x][y] !== "!"
        ) {
          buscaMinas.tableroVisible[x][y] = "!";
          console.table(buscaMinas.tableroVisible);
        } else if (buscaMinas.tableroPulsaciones[x][y] === "p") {
          throw new Error(
            "No puedes colocar una bandera en una casilla descubierta"
          );
        } else if (
          buscaMinas.tableroPulsaciones[x][y] !== "p" &&
          buscaMinas.tableroVisible[x][y] === "!"
        ) {
          buscaMinas.tableroVisible[x][y] = "$";
          console.table(buscaMinas.tableroVisible);
        }
        buscaMinas.comprobarGanadorBanderas();
      } catch (e) {
        console.log(e.message);
      }
    },

    /**
     * Actualiza los valores del tablero visible
     */

    actualizaCambios() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroPulsaciones[i][j] === "p") {
            buscaMinas.tableroVisible[i][j] = buscaMinas.tableroMaster[i][j];
          }
        }
      }
    },
    /**
     * Genera los tableros y los inicializa
     */
    generarTableros() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        buscaMinas.tableroMaster[i] = [];
        buscaMinas.tableroVisible[i] = [];
        buscaMinas.tableroCopiaMaster[i] = [];
        buscaMinas.tableroPulsaciones[i] = [];
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinas.tableroMaster[i][j] = 0;
          buscaMinas.tableroVisible[i][j] = "$";
          buscaMinas.tableroCopiaMaster[i][j] = 0;
          buscaMinas.tableroPulsaciones[i][j] = 0;
        }
      }
    },

    /**
     * Comprueba si ganaste la partida, mediante el uso de banderas
     */

    comprobarGanadorBanderas() {
      let contadorBanderasMinas = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (
            buscaMinas.tableroVisible[i][j] === "!" &&
            buscaMinas.tableroMaster[i][j] === "x"
          ) {
            contadorBanderasMinas++;
          }
        }
      }

      console.log(contadorBanderasMinas);

      if (contadorBanderasMinas === buscaMinas.numMinas) {
        throw new Error("Has ganado la partida");
      }
    },
    /**
     * Genera y coloca las minas
     */

    generaMinas() {
      for (let i = 0; i < buscaMinas.numMinas; i++) {
        let fila = Math.floor(Math.random() * (buscaMinas.filas - 1 - 0)) + 0;
        let columna =
          Math.floor(Math.random() * (buscaMinas.columnas - 1 - 0)) + 0;

        while (buscaMinas.tableroMaster[fila][columna] === "x") {
          fila = Math.floor(Math.random() * (buscaMinas.filas - 1 - 0)) + 0;
          columna =
            Math.floor(Math.random() * (buscaMinas.columnas - 1 - 0)) + 0;
        }

        buscaMinas.tableroMaster[fila][columna] = "x";
        buscaMinas.tableroCopiaMaster[fila][columna] = "x";
      }
    },

    /**
     * Carga la pulsacion en la matriz correspondiente
     * @param x cordenada para la fila
     * @param y coordenada para la columna
     */

    cargarPulsacion(x, y) {
      buscaMinas.tableroPulsaciones[x][y] = "p";
    },
    /**
     * Coloca los numeros alrededor de las minas del tablero
     */

    numerosAlrededorMinas() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroMaster[i][j] === "x") {
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

    /**
     * Coloca el numero de minas
     */

    cuentaMinas(ii, ij, fi, fj) {
      for (let i = ii; i <= fi; i++) {
        for (let j = ij; j <= fj; j++) {
          if (buscaMinas.tableroMaster[i][j] !== "x") {
            if (buscaMinas.tableroMaster[i][j] === 0) {
              buscaMinas.tableroMaster[i][j] = 0 + 1;
              buscaMinas.tableroCopiaMaster[i][j] = 0 + 1;
            } else {
              buscaMinas.tableroMaster[i][j] =
                parseInt(buscaMinas.tableroMaster[i][j]) + 1;
              buscaMinas.tableroCopiaMaster[i][j] = parseInt(
                buscaMinas.tableroMaster[i][j]
              );
            }
          }
        }
      }
    },

    /**
     * Devuelve el número de casillas que hay pulsadas en el tablero
     */

    obtenerNumeroCasillasPulsadas() {
      let contador = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroPulsaciones[i][j] === "p") contador++;
        }
      }
      return contador;
    },
    /**
     * Devuelve el número de casillas necesarias para ganar del tablero
     */
    obtenerNumeroCasillasParaGanar() {
      let contador = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroMaster[i][j] !== "x") contador++;
        }
      }
      return contador;
    },
    /**
     * Descubre casillas, de manera recursiva
     * @param x coordenada para la fila
     * @param y coordenada para la columna
     */ abrirCeros(x, y) {
      if (buscaMinas.tableroCopiaMaster[x][y] === 0) {
        buscaMinas.tableroCopiaMaster[x][y] = -1;
        if (buscaMinas.tableroMaster[x][y] === 0) {
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
    /**
     * pica una casilla y realiza las acciones correspondientes
     * @param i coordenada fila
     * @param j coordenada columna
     */ picar(i, j) {
      try {
        if (buscaMinas.tableroMaster[i][j] === "x") {
          throw new Error("Pulsaste una mina");
        } else if (buscaMinas.tableroPulsaciones[i][j] === "p") {
          throw new Error("Esta casilla ya fue pulsada");
        } else {
          buscaMinas.abrirCeros(i, j);
          buscaMinas.cargarPulsacion(i, j);
          buscaMinas.actualizaCambios();
          console.log("Tablero Master \n");
          console.table(buscaMinas.tableroMaster);
          console.log("Tablero Visible \n");
          console.table(buscaMinas.tableroVisible);
          console.log("Tablero pulsaciones \n");
          console.table(buscaMinas.tableroPulsaciones);
          buscaMinas.comprobarSiGana();
        }
      } catch (e) {
        if (e.message === "Pulsaste una mina") {
          console.error(e.message);
          buscaMinas.init();
        } else {
          console.error(e.message);
        }
      }
    },
    /**
     * Comprueba si ganas las partida de manera normal
     */ comprobarSiGana() {
      try {
        if (
          buscaMinas.obtenerNumeroCasillasPulsadas() ===
          buscaMinas.obtenerNumeroCasillasParaGanar()
        ) {
          throw new Error("¡¡¡ Felicidades has ganado !!!");
        }
      } catch (e) {
        console.log(e.message);
        buscaMinas.init();
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
