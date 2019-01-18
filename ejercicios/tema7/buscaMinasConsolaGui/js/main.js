/**
 * Buscaminas consola
 * @author Jesús Mejías Leiva
 */
export let buscaMinas = {
  tableroMaster: [],
  tableroCopiaMaster: [],
  tableroVisible: [],
  tableroPulsaciones: [],
  filas: 0,
  columnas: 0,
  numMinas: 0,
  nivel: "",
  flagGanado: false,
  flagFinPartida: false,
  flagRecord: false,
  numBanderas: 0,

  /**
   * Genera la funcionalidad
   */
  init() {
    buscaMinas.finPartida = false;
    buscaMinas.flagFinPartida = false;
    buscaMinas.elegirNivel();
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
      if (
        buscaMinas.tableroPulsaciones[x][y] !== "p" &&
        buscaMinas.tableroVisible[x][y] !== "!"
      ) {
        if (buscaMinas.numBanderas > 0) {
          buscaMinas.tableroVisible[x][y] = "!";
          buscaMinas.numBanderas--;
          console.clear();
          console.table(buscaMinas.tableroMaster);
          console.table(buscaMinas.tableroVisible);
          console.log(buscaMinas.numBanderas);
        }
      } else if (
        buscaMinas.tableroPulsaciones[x][y] !== "p" &&
        buscaMinas.tableroVisible[x][y] === "!"
      ) {
        buscaMinas.tableroVisible[x][y] = "#";
        buscaMinas.numBanderas++;
        console.clear();
        console.table(buscaMinas.tableroMaster);
        console.table(buscaMinas.tableroVisible);
        console.log(buscaMinas.numBanderas);
      }
      buscaMinas.comprobarGanadorBanderas();
  },
    /**
     * intenta destapar las casillas colindantes, sólo si el número de banderas
     * se corresponden con las que indica la casilla. Entonces muestra el campo
     * de minas actualizado.
     * En caso de estar las banderas equivocadas se indica que se ha perdido el
     * juego.
     */
    despejar(x,y){

      if (x > buscaMinas.filas || y > buscaMinas.columnas){
        throw new Error("Coordenadas no válidas");
      }

      if (buscaMinas.obtenerBanderasColindantes(x,y) === buscaMinas.tableroMaster[x][y]){

        if (x > 0 && y > 0){
          if (buscaMinas.tableroVisible[x - 1][ y - 1] !== "!" && buscaMinas.tableroPulsaciones[x - 1][y - 1] !== "p"){
            buscaMinas.picar(x-1,y-1);
          }
        }

        if ( y > 0){
          if (buscaMinas.tableroVisible[x][y - 1] !== "!" && buscaMinas.tableroPulsaciones[x][y-1] !== "p"){
            buscaMinas.picar(x,y-1);
          }
        }

        if (y > 0 && x < buscaMinas.filas - 1){
          if (buscaMinas.tableroVisible[x + 1][y - 1] !== "!" && buscaMinas.tableroPulsaciones[x+1][y-1] !== "p"){
            buscaMinas.picar(x+1,y-1);
          }
        }

        if (x > 0){
          if (buscaMinas.tableroVisible[x - 1][y] !== "!" && buscaMinas.tableroPulsaciones[x-1][y] !== "p"){
            buscaMinas.picar(x-1,y);
          }
        }

        if (x < buscaMinas.filas - 1 ){
          if (buscaMinas.tableroVisible[x + 1][y] !== "!" && buscaMinas.tableroPulsaciones[x+1][y] !== "p"){
            buscaMinas.picar(x+1,y);
          }
        }

        if (y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x][y + 1] !== "!" && buscaMinas.tableroPulsaciones[x][y+1] !== "p"){
            buscaMinas.picar(x,y+1);
          }
        }

        if (x < buscaMinas.filas - 1  && y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x + 1][y + 1] !== "!" && buscaMinas.tableroPulsaciones[x+1][y+1] !== "p"){
            buscaMinas.picar(x+1,y+1);
          }
        }

        if (x > 0  && y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x - 1][y + 1] !== "!" && buscaMinas.tableroPulsaciones[x-1][y+1] !== "p"){
            buscaMinas.picar(x-1,y+1);
          }
        }

      }
    },
    /**
     * Obtiene el numero de banderas de las casillas colindantes, de la casilla pasada por parámetros
     * @param x coordenada de la fila
     * @param y coordenada de la columna
     */
    obtenerBanderasColindantes(x,y){
      let banderas = 0;
      if (buscaMinas.tableroPulsaciones[x][y] === "p"){
        if (x > 0 && y > 0){
          if (buscaMinas.tableroVisible[x - 1][ y - 1] === "!"){
            banderas++;
          }
        }

        if ( y > 0){
          if (buscaMinas.tableroVisible[x][y - 1] === "!"){
            banderas++;
          }
        }

        if (y > 0 && x < buscaMinas.filas - 1){
          if (buscaMinas.tableroVisible[x + 1][y - 1] === "!"){
            banderas++;
          }
        }

        if (x > 0){
          if (buscaMinas.tableroVisible[x - 1][y] === "!"){
            banderas++;
          }
        }

        if (x < buscaMinas.filas - 1 ){
          if (buscaMinas.tableroVisible[x + 1][y] === "!"){
            banderas++;
          }
        }

        if (y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x][y + 1] === "!"){
            banderas++;
          }
        }

        if (x < buscaMinas.filas - 1  && y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x + 1][y + 1] === "!"){
            banderas++;
          }
        }

        if (x > 0  && y < buscaMinas.columnas - 1){
          if (buscaMinas.tableroVisible[x - 1][y + 1] === "!"){
            banderas++;
          }
        }
      }

      return banderas;
    },
  /**
   * Selecciona el nivel y asigna las casillas y el numero de minas según el nivel
   */
  elegirNivel() {
    switch (buscaMinas.nivel.toLowerCase()) {
      case "facil":
        buscaMinas.filas = 8;
        buscaMinas.columnas = 8;
        buscaMinas.numMinas = 10;
        buscaMinas.numBanderas = 10;
        break;
      case "intermedio":
        buscaMinas.filas = 16;
        buscaMinas.columnas = 16;
        buscaMinas.numMinas = 40;
        buscaMinas.numBanderas = 40;
        break;
      case "experto":
        buscaMinas.filas = 20;
        buscaMinas.columnas = 24;
        buscaMinas.numMinas = 99;
        buscaMinas.numBanderas = 99;
        break;
      default:
        break;
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
        buscaMinas.tableroVisible[i][j] = "#";
        buscaMinas.tableroCopiaMaster[i][j] = 0;
        buscaMinas.tableroPulsaciones[i][j] = 0;
      }
    }
  },

  /**
   * Comprueba si ganaste la partida, mediante el uso de banderas
   */
  comprobarGanadorBanderas() {
    let casillasSinPulsar = 0;
      let casillasGanar = 0;
      let casillasPulsadas = 0;
      for (let i = 0; i < buscaMinas.filas; i++) {
        for (let j = 0; j < buscaMinas.columnas; j++) {
          if (buscaMinas.tableroPulsaciones[i][j] === "p") {
            casillasPulsadas++;
          }
          if (buscaMinas.tableroPulsaciones[i][j] !== "p") {
            casillasSinPulsar++;
            if (
              (casillasSinPulsar === buscaMinas.numMinas) &&
              (buscaMinas.tableroMaster[i][j] === "x" && buscaMinas.tableroVisible[i][j] === "!")
            ) {
              casillasGanar++
            }
          }
        }
      }
        if (casillasPulsadas > 1 && (casillasGanar === buscaMinas.numMinas)) {
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
        columna = Math.floor(Math.random() * (buscaMinas.columnas - 1 - 0)) + 0;
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
   * @param ii inicio de fila
   * @param ij inicio de columna
   * @param fi fin de fila
   * @param fj fin de columna
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
   */

  abrirCeros(x, y) {
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
   */

  picar(i, j) {
      if (buscaMinas.tableroMaster[i][j] === "x") {
        buscaMinas.flagFinPartida = true;
        throw new Error("Pulsaste una mina");
      } else {
        buscaMinas.abrirCeros(i, j);
        buscaMinas.cargarPulsacion(i, j);
        buscaMinas.actualizaCambios();
        console.clear();
        console.log("Tablero Master \n");
        console.table(buscaMinas.tableroMaster);
        console.log("Tablero Visible \n");
        console.table(buscaMinas.tableroVisible);
        // console.log("Tablero pulsaciones \n");
        // console.table(buscaMinas.tableroPulsaciones);
        buscaMinas.comprobarSiGana();
      }
  },

  /**
   * Comprueba si ganas las partida de manera normal
   */

  comprobarSiGana() {

      if (
        buscaMinas.obtenerNumeroCasillasPulsadas() ===
        buscaMinas.obtenerNumeroCasillasParaGanar()
      ) {
        buscaMinas.flagGanado = true;
        throw new Error("¡¡¡ Felicidades has ganado !!!");
      }
  },
  /**
   * Pregunta si deseas volver a jugar, es caso verdadero inicia el juego
   * @param msg mensaje para mostrar al usuario
   */
  volverAjugar(msg) {
    let volverAjugar = "";
    do {
      volverAjugar = prompt(msg + ", ¿deseas volver a jugar? (s/n)");
    } while (
      volverAjugar.toLowerCase() === "s" &&
      volverAjugar.toLowerCase() === "n"
    );
    if (volverAjugar.toLowerCase() === "s") {
      location.reload();
    } else {
      return;
    }
  }
};
