{
  let containerTablero;
  function init() {
    containerTablero = document.getElementById("containerTablero");
    buscaminas.generaTablero();
    buscaminas.generarMinas();
  }

  let buscaminas = {
    nivel: "principiante",

    generaTablero() {
      let tablero;

      if (buscaminas.nivel === "principiante") {
        containerTablero.className = "principiante";
        for (let x = 0; x < 8; x++) {
          for (let j = 0; j < 8; j++) {
            let casilla = document.createElement("div");
            casilla.id = x + "" + j;
            casilla.textContent = "0";
            containerTablero.appendChild(casilla);
            casilla.addEventListener("click", buscaminas.comprobarCasilla);
          }
        }
      }
    },
    comprobarCasilla(){
        if (this.textContent === "1") {
            console.log("Pulsaste una mina");
        }
        //console.log(this.getAttribute("id"));
    },
    generarMinas(){

        let tableroValues = document.querySelectorAll("#containerTablero div");

        if (buscaminas.nivel === "principiante") {
            for (var i = 0; i < 8; i++) {
                let mina = Math.floor(Math.random() * (tableroValues.length - 0)) + 0;
                if (tableroValues[mina].innerHTML === "0"){
                    tableroValues[mina].innerHTML = "1"; 
                }
            }
        }

    }
  };

  window.addEventListener("load", init);
}
