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
    buscaminas.numBombasNivel();
    buscaminas.generarBombas();
    buscaminas.compruebaBombas();

    console.log("Numero de minas : \n" +buscaminas.obtenerNumeroDeBombas());
  }

  let buscaminas = {
    nivel: "intermedio",
    finPartida: false,
    numBombas: null,
    /**
     * Genera una tabla en html, que nos sirve como el tablero del juego
     */
    generaTablero() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraTablero(10);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraTablero(16);
      }
    },
    /**
     * Comprueba el nivel y asigna el numero de bombas
     */
    numBombasNivel(){
      if (buscaminas.nivel === "principiante"){
        buscaminas.numBombas = 10;
      }else if (buscaminas.nivel === "intermedio"){
        buscaminas.numBombas = 40;
      }
    },
    /**
     * Reliza una función u otra al pulsar en una casilla
     */
    comprobarCasilla() {
      if (this.value === "x") {
        if (buscaminas.nivel === "principiante") {
          buscaminas.descubreMinasTrasPerder(10);
        }else if (buscaminas.nivel === "intermedio"){
          buscaminas.descubreMinasTrasPerder(16);
        }
        this.style.background = "#FFEB3B";
        spanError.textContent = "Pulsaste una mina, perdiste";
        buscaminas.finPartida = true;
        buscaminas.crearBotonJugarDeNuevo();
        buscaminas.eliminarEventoInput();
      } else {
        let coordenada = this.getAttribute("id");
        this.style.background = "#fff";
        if (coordenada.length === 2){
          buscaminas.abrirCasillas(
            10,
            parseInt(coordenada[0]),
            parseInt(coordenada[1])
          );
        }else{
          buscaminas.abrirCasillas(
            10,
            parseInt(coordenada[0] + "" + coordenada[1]),
            parseInt(coordenada[2] + "" + coordenada[3])
          );
        }
        
      }
    },
    /**
     * Descubre las minas del tablero tras perder la partida
     * @param casillasNivel numero de casillas según el nivel
     */
    descubreMinasTrasPerder(casillasNivel){
      for (let i = 0; i < casillasNivel; i++) {
        for (let j = 0; j < casillasNivel; j++) {
          if (buscaminas.obtenerValorCasilla(i,j).value === "x"){
            buscaminas.obtenerValorCasilla(i,j).style.background = "#FFEB3B"
          }
        }
      }
    },
    eliminarEventoInput() {
      let inputs = document.getElementsByTagName("input");
      if (buscaminas.finPartida) {
        Array.from(inputs).forEach(element => {
          element.removeEventListener("click", buscaminas.comprobarCasilla);
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
     * invoca al método funcionalidadGeneraBombas(), y le pasa un número de casillas según el nivel
     */
    generarBombas() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraBombas(10);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraBombas(16);
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
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadCuentaBombas(10);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadCuentaBombas(16);
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
            if (buscaminas.obtenerValorCasilla(i, j).value === "0") {
              buscaminas.obtenerValorCasilla(i, j).value = 0 + 1;
            } else {
              buscaminas.obtenerValorCasilla(i, j).value =
                parseInt(buscaminas.obtenerValorCasilla(i, j).value) + 1;
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
      for (let i = 0; i < buscaminas.numBombas; i++) {
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
          //celda.selectionStart = "none";
          celda.addEventListener("click", buscaminas.comprobarCasilla);
          celda.style.background = "#263238";
          containerTablero.appendChild(celda);
        }
      }
    },
    /**
     * Función para abrir casillas recursivamente
     * @param casillasNivel numero de casillas según el nivel
     * @param x coordenada para la fila
     * @param y coordenada para la columna
     */
    abrirCasillas(casillasNivel, x, y) {
      if (buscaminas.obtenerValorCasilla(x, y).value === "0") {
        buscaminas.obtenerValorCasilla(x, y).value = "";
        for (
          let j = Math.max(x - 1, 0);
          j <= Math.min(x + 1, casillasNivel - 1);
          j++
        ) {
          for (
            let k = Math.max(y - 1, 0);
            k <= Math.min(y + 1, casillasNivel - 1);
            k++
          ) {
            document.getElementById(j + "" + k).style.background = "#fff";
            buscaminas.abrirCasillas(10, j, k);
          }
        }
      }
    }
  };

  window.addEventListener("load", init);
}
