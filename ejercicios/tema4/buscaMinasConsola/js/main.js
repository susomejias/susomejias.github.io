{
  var buscaMinas = {
    tablero: [],
    tablero2: [],
    tableroBanderas: [],
    filas: 8,
    columnas: 8,
    numMinas: 10,
    /**
     * genera un campo de minas nuevo y lo muestra por consola.
     */

    init() {
      buscaMinas.generarTableros();
    },
    /**
     * En caso de picar una minas se indica que se ha perdido el juego.
     */

    mostrar() {
      buscaMinas.generarTableros();
    },

    /**
     * marca con una bandera la casilla(x, y) y muestra el campo de minas actualizado.
     */

    marcar(x, y) {
      try {
        if (buscaMinas.tablero[x][y] !== "") {
          buscaMinas.tableroBanderas[x][y] = "!";
          console.table(buscaMinas.tableroBanderas);
        } else {
          throw new Error(
            "No puedes colocar una bandera en una casilla descubierta"
          );
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    /**
     * intenta destapar las casillas colindantes, sólo si el número de banderas se * corresponden con las que indica la casilla. Entonces muestra el campo de minas actualizado.
     En caso de estar las banderas equivocadas se indica que se ha perdido el juego.
     Después se generará el entorno gráfico. Pero eso no entra en esta entrega.
     */

    despejar(x, y) {},

    generarTableros() {
      for (let i = 0; i < buscaMinas.filas; i++) {
        buscaMinas.tablero[i] = [];
        buscaMinas.tablero2[i] = [];
        buscaMinas.tableroBanderas[i] = [];
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinas.tablero[i][j] = 0;
          buscaMinas.tablero2[i][j] = 0;
          buscaMinas.tableroBanderas[i][j] = 0;
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
        buscaMinas.tablero2[fila][columna] = "x";
        buscaMinas.tableroBanderas[fila][columna] = "x";
      }
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
            if (buscaMinas.tablero[i][j] === "0") {
              buscaMinas.tablero[i][j] = 0 + 1;
              buscaMinas.tablero2[i][j] = 0 + 1;
              buscaMinas.tableroBanderas[i][j] = 0 + 1;
            } else {
              buscaMinas.tablero[i][j] = parseInt(buscaMinas.tablero[i][j]) + 1;
              buscaMinas.tablero2[i][j] =
                parseInt(buscaMinas.tablero2[i][j]) + 1;
              buscaMinas.tableroBanderas[i][j] =
                parseInt(buscaMinas.tableroBanderas[i][j]) + 1;
            }
          }
        }
      }
    },
    abrirCeros(x, y) {
      //buscaMinas.tablero2[x][y] = -1;
      if (buscaMinas.tablero2[x][y] === 0) {
        buscaMinas.tablero2[x][y] = -1;
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
              buscaMinas.tablero2[j][k] = "";
              //array.push(j + "_" + k);
              buscaMinas.abrirCeros(j, k);
            }
        }
      }
    },
    picar(i, j) {
      try {
        if (buscaMinas.tablero[i][j] === "x") {
          throw new Error("Pulsaste una mina");
        } else {
          buscaMinas.abrirCeros(i, j);
          buscaMinas.tablero[i][j] = "";
          console.table(buscaMinas.tablero2);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  function init() {
    buscaMinas.mostrar();
    buscaMinas.generaMinas();
    buscaMinas.numerosAlrededorMinas();
    console.table(buscaMinas.tablero);
  }

  window.addEventListener("load", init);
}
