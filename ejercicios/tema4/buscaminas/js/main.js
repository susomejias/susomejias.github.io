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
    nivel: "principiante",
    generaTablero() {
      let tabla = document.createElement("table");

      if (buscaminas.nivel === "principiante") {
        for (let i = 0; i < 8; i++) {
          let hilera = document.createElement("tr");

          for (let j = 0; j < 8; j++) {
            let celda = document.createElement("td");
            celda.id = i + "" + j;
            celda.textContent = "0";
            celda.addEventListener("click", buscaminas.comprobarCasilla);
            celda.style.background = "#263238";
            hilera.appendChild(celda);
          }

          tabla.appendChild(hilera);
        }
      } else if (buscaminas.nivel === "intermedio") {
        for (let i = 0; i < 10; i++) {
          let hilera = document.createElement("tr");

          for (let j = 0; j < 10; j++) {
            let celda = document.createElement("td");
            celda.id = i + "" + j;
            celda.textContent = "0";
            celda.addEventListener("click", buscaminas.comprobarCasilla);
            celda.style.background = "#263238";
            hilera.appendChild(celda);
          }

          tabla.appendChild(hilera);
        }
      }

      containerTablero.appendChild(tabla);
      tabla.style.borderCollapse = "colapse"; //setAttribute("border", "1");
    },

    comprobarCasilla() {
      if (this.textContent === "*") {
        this.style.background = "#FF8A80";
        spanError.textContent = "Pulsaste una mina, perdiste";
      } else {
        buscaminas.compruebaBombas();
        // hacer comprobaciones de minas
      }
    },

    generarBombas() {
      if (buscaminas.nivel === "principiante") {
        for (let i = 0; i < 8; i++) {
            let fila = Math.floor(Math.random() * (7 - 0)) + 0;
            let columna = Math.floor(Math.random() * (7 - 0)) + 0;

            while (buscaminas.obtenerValorCasilla(fila,columna).textContent === "*"){
                fila = Math.floor(Math.random() * (7 - 0)) + 0;
                columna = Math.floor(Math.random() * (7 - 0)) + 0;
            }

            buscaminas.obtenerValorCasilla(fila,columna).textContent = "*"
        }
        } else if (buscaminas.nivel === "intermedio") { 
            for (let i = 0; i < 10; i++) {

                let fila = Math.floor(Math.random() * (9 - 0)) + 0;
                let columna = Math.floor(Math.random() * (9 - 0)) + 0;
    
                while (buscaminas.obtenerValorCasilla(fila,columna).textContent === "*"){
                    fila = Math.floor(Math.random() * (9 - 0)) + 0;
                    columna = Math.floor(Math.random() * (9 - 0)) + 0;
                }

            buscaminas.obtenerValorCasilla(fila,columna).textContent = "*"
          }
      }
    },
    obtenerNumeroDeBombas() {
      let casillas = document.querySelectorAll("td");
      let bombas = [];

      for (casilla of casillas) {
        if (casilla.textContent === "*") {
          bombas.push(casilla);
        }
      }

      return bombas.length;
    },
    compruebaBombas() {
      //console.log(coordenadaPulsada, casilla);

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (buscaminas.obtenerValorCasilla(i,j).textContent === "*") {
            if(i == 0 && j == 0){
                buscaminas.cuentaBombas(i, j, i + 1, j + 1);
            }
            else if (i == 0 && (j > 0 && j < 7)) {
                buscaminas.cuentaBombas(i, j - 1, i + 1, j + 1);
            }
            else if(i == 0 && j == 7){
                buscaminas.cuentaBombas(i, j - 1, i + 1, j);
            }
            else if(j == 7 && (i > 0 && i < 7)){
                buscaminas.cuentaBombas(i - 1, j - 1, i + 1, j);
            }
            else if(i == 7 && j == 7){
                buscaminas.cuentaBombas(i - 1, j - 1, i, j);
            }
            else if(i == 7 && (j > 0 && j < 7)){
                buscaminas.cuentaBombas(i - 1, j - 1, i, j + 1);
            }
            else if(i == 7 && j == 0){
                buscaminas.cuentaBombas(i - 1, j, i, j + 1);
            }
            else if(j == 0 && (i > 0 && i < 7)){
                buscaminas.cuentaBombas(i - 1, j, i + 1, j + 1);
            }else{
                buscaminas.cuentaBombas(i - 1, j - 1, i + 1, j + 1);
            }
          }
        }
      }

      //console.log(tablero[0].getAttribute("id"));
    },

    cuentaBombas(ii, ij, fi, fj) {
      for (let i = ii; i <= fi; i++) {
        for (let j = ij; j <= fj; j++) {

          if (buscaminas.obtenerValorCasilla(i,j).textContent !== "*") {
            //console.log(i,j);
            //console.log(buscaminas.obtenerValorCasilla(i,j).textContent);
            buscaminas.obtenerValorCasilla(i,j).textContent = (parseInt(buscaminas.obtenerValorCasilla(i,j).textContent) + 1);
          }
        }
      }
    },
    obtenerValorCasilla(i,j){
        return document.getElementById(i + "" + j);
    }
  };

  window.addEventListener("load", init);
}
