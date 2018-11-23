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
    generaTablero() {
        let tabla = document.createElement("table");

        if (buscaminas.nivel === "principiante"){
            for (let i = 0; i < 8; i++) {

                let hilera = document.createElement("tr");
    
                for (let j = 0; j < 8; j++) {
                    let celda = document.createElement("td");
                    celda.id = i + "" + j;
                    celda.addEventListener("click", buscaminas.comprobarCasilla);
                    celda.style.background = "#263238";
                    hilera.appendChild(celda);
                }
    
                tabla.appendChild(hilera);
    
            }
        }else if (buscaminas.nivel === "intermedio"){
            for (let i = 0; i < 10; i++) {

                let hilera = document.createElement("tr");
    
                for (let j = 0; j < 10; j++) {
                    let celda = document.createElement("td");
                    celda.id = i + "" + j;
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

    comprobarCasilla(){
        if (this.textContent === "1") {
            this.style.background = "#FF8A80";
            spanError.textContent = "Pulsaste una mina, perdiste";
        }else {
            // hacer comprobaciones de minas
        }
    },

    generarBombas(){
        if (buscaminas.nivel === "principiante"){
            for (let i = 0; i < 8; i++) {
                let fila = Math.floor(Math.random() * (7 - 0)) + 0;
                let columna = Math.floor(Math.random() * (7 - 0)) + 0;
                document.getElementById(fila + "" + columna).textContent = "1";
            }
        }else if (buscaminas.nivel === "intermedio"){
            for (let i = 0; i < 10; i++) {
                let fila = Math.floor(Math.random() * (9 - 0)) + 0;
                let columna = Math.floor(Math.random() * (9 - 0)) + 0;
                document.getElementById(fila + "" + columna).textContent = "1";
            }
        }
        
    },
    obtenerNumeroDeBombas(){
        let casillas = document.querySelectorAll("td");
        let bombas = [];
        
        for (casilla of casillas) {
            if (casilla.textContent === "1"){
                bombas.push(casilla);
            }
        }

        return bombas.length;
    }
  };

  window.addEventListener("load", init);
}
