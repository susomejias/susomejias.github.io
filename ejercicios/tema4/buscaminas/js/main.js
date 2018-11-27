/**
 * Juego buscaminas en JS vanilla
 * @author Jesús Mejías Leiva
 */
{
  let containerTablero;
  let spanError;
  let timer;
  let elegirNivel;
  function init() {
    containerTablero = document.getElementById("containerTablero");
    spanError = document.getElementById("spanError");
    timer = document.getElementById("timer");
    elegirNivel = document.getElementById("elegirNivel");

    elegirNivel.addEventListener("change", buscaminas.actualizaNivel);

  }

  let buscaminas = {
    nivel: "principiante",
    finPartida: false,
    isGanado: false,
    numBombas: null,
    numCasillas: null,
    /**
     * Genera una tabla en html, que nos sirve como el tablero del juego
     */ generaTablero() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraTablero(10);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraTablero(16);
      }
    },
    actualizaNivel() {
      buscaminas.mostrarTiempoPartida();
      buscaminas.nivel = this[this.selectedIndex].value;
      if (containerTablero.childElementCount === 0) {
        buscaminas.generaTablero();
        buscaminas.numBombasNivel();
        buscaminas.generarBombas();
        buscaminas.compruebaBombas();
      } else {
        buscaminas.eliminarTablero();
        buscaminas.generaTablero();
        buscaminas.numBombasNivel();
        buscaminas.generarBombas();
        buscaminas.compruebaBombas();
      }
    },
    isGanado(casillasNivel){
      let numCasillasSinDescubrir = 0;
      for (let k = 0; k < casillasNivel; k++) {
        for (let f = 0; f < casillasNivel; f++) {
          //console.log(buscaminas.obtenerValorCasilla(k,f).style.background);

          if (buscaminas.obtenerValorCasilla(k,f).style.background === "rgb(124, 179, 66)"){
            numCasillasSinDescubrir++;
          }
        }
      }
      //console.log(numCasillasSinDescubrir);
      //console.log(buscaminas.numBombas);
      
      
      if (numCasillasSinDescubrir === buscaminas.numBombas){
          buscaminas.isGanado = true;
      }
    },
    eliminarTablero() {
      let inputs = Array.from(document.getElementsByTagName("input"));

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].remove();
      }
    },
    /**
     * Comprueba el nivel y asigna el numero de bombas
     */ numBombasNivel() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.numBombas = 10;
        buscaminas.numCasillas = 10 * 10;

      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.numBombas = 40;
        buscaminas.numCasillas = 16 * 16;
      }
    },
    /**
     * Reliza una función u otra al pulsar en una casilla
     */ comprobarCasilla() {
      if (this.value === "x") {
        if (buscaminas.nivel === "principiante") {
          buscaminas.descubreMinasTrasPerder(10);
        } else if (buscaminas.nivel === "intermedio") {
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
        
        if (coordenada.length === 2) {
          console.log(buscaminas.isGanado(10));
          buscaminas.abrirCasillas(
            10,
            parseInt(coordenada[0]),
            parseInt(coordenada[1])
          );
        } else {
          buscaminas.abrirCasillas(
            10,
            parseInt(coordenada[0] + "" + coordenada[1]),
            parseInt(coordenada[2] + "" + coordenada[3])
          );
        }
      }
    },
    mostrarTiempoPartida() {
      let seconds = 0;
      if (!buscaminas.finPartida) {
        setInterval(() => {
          seconds++;
          timer.innerHTML = `<img src="images/hourglass.svg" /> <p>${seconds}</p>`;
        }, 1000);
      } else {
        return;
      }
    },
    /**
     * Descubre las minas del tablero tras perder la partida
     * @param casillasNivel numero de casillas según el nivel
     */ descubreMinasTrasPerder(casillasNivel) {
      for (let i = 0; i < casillasNivel; i++) {
        for (let j = 0; j < casillasNivel; j++) {
          if (buscaminas.obtenerValorCasilla(i, j).value === "x") {
            buscaminas.obtenerValorCasilla(i, j).style.background = "#FFEB3B";
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
     */ crearBotonJugarDeNuevo() {
      let main = document.getElementsByTagName("main")[0];
      let btnVolverJugar = document.createElement("button");
      btnVolverJugar.id = "btnVolverJugar";
      btnVolverJugar.textContent = "Volver a jugar";
      main.appendChild(btnVolverJugar);
      btnVolverJugar.addEventListener("click", () => location.reload());
    },
    /**
     * invoca al método funcionalidadGeneraBombas(), y le pasa un número de casillas según el nivel
     */ generarBombas() {
      if (buscaminas.nivel === "principiante") {
        buscaminas.funcionalidadGeneraBombas(10);
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.funcionalidadGeneraBombas(16);
      }
    },
    /**
     * invoca al método funcionalidadCuentaBombas(), y le pasa un número de casillas según el nivel
     */ compruebaBombas() {
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
     */ cuentaBombas(ii, ij, fi, fj) {
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
     */ obtenerValorCasilla(i, j) {
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
     */ funcionalidadGeneraBombas(casillasNivel) {
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
     */ funcionalidadGeneraTablero(casillasNivel) {
      containerTablero.style.display = "grid";
      containerTablero.style.gridTemplateColumns =
        "repeat(" + casillasNivel + ", 1fr)";

      for (let i = 0; i < casillasNivel; i++) {
        for (let j = 0; j < casillasNivel; j++) {
          let celda = document.createElement("input");
          celda.id = i + "" + j;
          celda.value = "0";
          celda.readOnly = "true";
          celda.addEventListener("click", buscaminas.comprobarCasilla);
          //celda.style.background = "#7CB342";
          celda.style.background = "#7CB342";
          celda.style.color = "#fff";
          containerTablero.appendChild(celda);
        }
      }

      let inputs = Array.from(document.getElementsByTagName("input"));

      for (var k = 1; k <= casillasNivel; k++) {
        for (var f = 1; f <= casillasNivel; f++) {
          if (k % 2 === 0 && f % 2 === 0) {
            // buscaminas.obtenerValorCasilla(k - 1, f - 1).style.background =
            //   "#9CCC65";
            buscaminas.obtenerValorCasilla(k - 1, f - 1).style.color =
              "#9CCC65";
          } else if (k % 2 !== 0 && f % 2 !== 0) {
            // buscaminas.obtenerValorCasilla(k - 1, f - 1).style.background =
            //   "#9CCC65";
            buscaminas.obtenerValorCasilla(k - 1, f - 1).style.color =
              "#9CCC65";
          }
        }
      }
    },
    /**
     * Función para abrir casillas recursivamente
     * @param casillasNivel numero de casillas según el nivel
     * @param x coordenada para la fila
     * @param y coordenada para la columna
     */ abrirCasillas(casillasNivel, x, y) {
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
