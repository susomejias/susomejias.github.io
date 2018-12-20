{
  let inputFilas;
  let inputColumnas;
  let btn;
  let buscaMinas = {
    tablero: [],
    tablero2: [],
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
     * pica en la casilla(x, y) y muestra el campo de minas actualizado.
     * En caso de picar una minas se indica que se ha perdido el juego.
     * En caso de no quedar casillas por levantar se indica que se ha ganado el juego.
     */

    picar(x, y) {},

    /**
     * marca con una bandera la casilla(x, y) y muestra el campo de minas actualizado.
     */

    marcar(x, y) {},

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
        for (let j = 0; j < buscaMinas.columnas; j++) {
          buscaMinas.tablero[i][j] = 0;
          buscaMinas.tablero2[i][j] = 0;
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
            } else {
              buscaMinas.tablero[i][j] = parseInt(buscaMinas.tablero[i][j]) + 1;
              buscaMinas.tablero2[i][j] =
                parseInt(buscaMinas.tablero2[i][j]) + 1;
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
    pedirCoordenada() {
      try {
        let i = parseInt(inputFilas.value);
        let j = parseInt(inputColumnas.value);
        if (buscaMinas.tablero[i][j] === "x") {
          throw new Error("Pulsaste una mina");
        } else {
          buscaMinas.abrirCeros(i, j);
          console.table(buscaMinas.tablero2);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  function init() {
    inputFilas = document.getElementById("fila");
    inputColumnas = document.getElementById("columna");
    btn = document.getElementsByTagName("button")[0];

    buscaMinas.mostrar();
    buscaMinas.generaMinas();
    buscaMinas.numerosAlrededorMinas();
    console.table(buscaMinas.tablero);
    btn.addEventListener("click", buscaMinas.pedirCoordenada);
  }

  window.addEventListener("load", init);
}
