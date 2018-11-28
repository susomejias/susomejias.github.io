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
    flagGanado: false,
    numBombas: 0,
    numCasillasNivel: 0,

    /**
     * Actualiza el numero de casillas en función del nivel
     */
    numCasillasDependeNivel(){
      if (buscaminas.nivel === "principiante") {
        buscaminas.numCasillasNivel = 10;
      } else if (buscaminas.nivel === "intermedio") {
        buscaminas.numCasillasNivel = 16;
      }
    },
    /**
     * Inicia el juego según el nivel seleccionado en el select
     */
    actualizaNivel() {
      buscaminas.mostrarTiempoPartida();
      buscaminas.nivel = this[this.selectedIndex].value;
      if (containerTablero.childElementCount === 0) {
        buscaminas.numCasillasDependeNivel();
        buscaminas.numBombasNivel();
        buscaminas.generaTablero();
        buscaminas.generarBombas();
        buscaminas.compruebaBombas();
      } else {
        buscaminas.eliminarTablero();
        buscaminas.numCasillasDependeNivel();
        buscaminas.numBombasNivel();
        buscaminas.generaTablero();
        buscaminas.generarBombas();
        buscaminas.compruebaBombas();
      }
    },
    /**
     * Comprueba si has ganado la partida
     */
    comprobarGanar() {
      let numCasillasSinDescubrir = 0;
      for (let k = 0; k < buscaminas.numCasillasNivel; k++) {
        for (let f = 0; f < buscaminas.numCasillasNivel; f++) {
          //console.log(buscaminas.obtenerValorCasilla(k,f).style.background);

          if (
            buscaminas.obtenerValorCasilla(k, f).style.background ===
            "rgb(124, 179, 66)"
          ) {
            numCasillasSinDescubrir++;
          }
        }
      }

      if (numCasillasSinDescubrir - 1 === buscaminas.numBombas) {
        buscaminas.flagGanado = true;
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
     * Comprueba el nivel y asigna el numero de bombas
     */ 
    numBombasNivel() {
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
      if (this.value === "x" && !buscaminas.flagGanado) {
        
          buscaminas.mostrarMinas();
        
        this.style.background = "#FFEB3B";
        spanError.textContent = "Pulsaste una mina, perdiste";
        buscaminas.finPartida = true;
        buscaminas.crearBotonJugarDeNuevo();
      } else {
        let coordenada = this.getAttribute("id");

        let flag = true;
        if ((!buscaminas.flagGanado && flag) || flag)
          this.style.background = "#fff";

        if (buscaminas.flagGanado) {
          spanError.textContent = "Has ganado";
          buscaminas.eliminarEventoInput();
          buscaminas.mostrarMinas();
        }

        if (coordenada.length === 2) {
          buscaminas.comprobarGanar();
          buscaminas.abrirCasillas(
            parseInt(coordenada[0]),
            parseInt(coordenada[1])
          );
        } else {
          buscaminas.comprobarGanar();
          buscaminas.abrirCasillas(
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
     * Descubre las minas del tablero
     */ 
    mostrarMinas() {
      for (let i = 0; i < buscaminas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaminas.numCasillasNivel; j++) {
          if (buscaminas.obtenerValorCasilla(i, j).value === "x") {
            buscaminas.obtenerValorCasilla(i, j).style.background = "#FFEB3B";
          } else {
            buscaminas.obtenerValorCasilla(i, j).style.background = "#FFFF";
            if (buscaminas.obtenerValorCasilla(i, j).value === "0") {
              buscaminas.obtenerValorCasilla(i, j).value = "";
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
      if (buscaminas.finPartida || buscaminas.flagGanado) {
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
    compruebaBombas() {
      for (let i = 0; i < buscaminas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaminas.numCasillasNivel; j++) {
          if (buscaminas.obtenerValorCasilla(i, j).value === "x") {
            if (i == 0 && j == 0) {
              buscaminas.cuentaBombas(i, j, i + 1, j + 1);
            } else if (i == 0 && (j > 0 && j < buscaminas.numCasillasNivel - 1)) {
              buscaminas.cuentaBombas(i, j - 1, i + 1, j + 1);
            } else if (i == 0 && j == buscaminas.numCasillasNivel - 1) {
              buscaminas.cuentaBombas(i, j - 1, i + 1, j);
            } else if (
              j == buscaminas.numCasillasNivel - 1 &&
              (i > 0 && i < buscaminas.numCasillasNivel - 1)
            ) {
              buscaminas.cuentaBombas(i - 1, j - 1, i + 1, j);
            } else if (i == buscaminas.numCasillasNivel - 1 && j == buscaminas.numCasillasNivel - 1) {
              buscaminas.cuentaBombas(i - 1, j - 1, i, j);
            } else if (
              i == buscaminas.numCasillasNivel - 1 &&
              (j > 0 && j < buscaminas.numCasillasNivel - 1)
            ) {
              buscaminas.cuentaBombas(i - 1, j - 1, i, j + 1);
            } else if (i == buscaminas.numCasillasNivel - 1 && j == 0) {
              buscaminas.cuentaBombas(i - 1, j, i, j + 1);
            } else if (j == 0 && (i > 0 && i < buscaminas.numCasillasNivel - 1)) {
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
     */ 
    generarBombas() {
      for (let i = 0; i < buscaminas.numBombas; i++) {
        let fila = Math.floor(Math.random() * (buscaminas.numCasillasNivel - 1 - 0)) + 0;
        let columna = Math.floor(Math.random() * (buscaminas.numCasillasNivel - 1 - 0)) + 0;

        while (buscaminas.obtenerValorCasilla(fila, columna).value === "x") {
          fila = Math.floor(Math.random() * (buscaminas.numCasillasNivel - 1 - 0)) + 0;
          columna = Math.floor(Math.random() * (buscaminas.numCasillasNivel - 1 - 0)) + 0;
        }

        buscaminas.obtenerValorCasilla(fila, columna).value = "x";
      }
    },
    colocarBandera(ev){
      //console.log(buscaminas.obtenerValorCasilla(k,f).style.background);
      if (ev.button === 2 && this.style.background !== "rgb(255, 255, 255)"){

        this.style.background = "red";
        //"`url("images/flag.svg")`;
      }
    },
    /**
     * Genera un tablero html, segun el numero de casillas
     */ 
    generaTablero() {
      containerTablero.style.display = "grid";
      containerTablero.style.gridTemplateColumns =
        "repeat(" + buscaminas.numCasillasNivel + ", 1fr)";

      for (let i = 0; i < buscaminas.numCasillasNivel; i++) {
        for (let j = 0; j < buscaminas.numCasillasNivel; j++) {
          let input = document.createElement("input");
          input.id = i + "" + j;
          input.value = "0";
          input.readOnly = "true";
          input.addEventListener("click", buscaminas.comprobarCasilla);
          input.addEventListener("mousedown", buscaminas.colocarBandera);
          //input.style.background = "#7CB342";
          input.style.background = "#7CB342";
          input.style.color = "#9CCC65";
          containerTablero.appendChild(input);
        }
      }

      let inputs = Array.from(document.getElementsByTagName("input"));

      for (var k = 1; k <= buscaminas.numCasillasNivel; k++) {
        for (var f = 1; f <= buscaminas.numCasillasNivel; f++) {
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
     * @param x coordenada para la fila
     * @param y coordenada para la columna
     */ 
    abrirCasillas(x, y) {
      if (buscaminas.obtenerValorCasilla(x, y).value === "0") {
        buscaminas.obtenerValorCasilla(x, y).value = "";
        for (
          let j = Math.max(x - 1, 0);
          j <= Math.min(x + 1, buscaminas.numCasillasNivel - 1);
          j++
        ) {
          for (
            let k = Math.max(y - 1, 0);
            k <= Math.min(y + 1, buscaminas.numCasillasNivel - 1);
            k++
          ) {
            document.getElementById(j + "" + k).style.background = "#fff";

            buscaminas.abrirCasillas(j, k);
          }
        }
      }
    }
  };

  window.addEventListener("load", init);
}
