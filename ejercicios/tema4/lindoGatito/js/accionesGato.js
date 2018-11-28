{
  let btnJugar;
  let btnComer;
  let btnDormir;
  let fNacimiento;
  let nombre;
  let raza;
  let peso;
  let accion;
  let spanError;
  function init() {
    btnComer = document.getElementById("btnComer");
    btnJugar = document.getElementById("btnJugar");
    btnDormir = document.getElementById("btnDormir");
    nombre = document.getElementById("nombre");
    fNacimiento = document.getElementById("fNacimiento");
    raza = document.getElementById("raza");
    peso = document.getElementById("peso");
    accion = document.getElementById("accion");
    spanError = document.getElementById("spanError");

    let gato = crearGato();

    btnComer.addEventListener("click", comer.bind(gato));

    btnJugar.addEventListener("click", jugar.bind(gato));

    btnDormir.addEventListener("click", dormir.bind(gato));
  }

  let actualizarCampos = function(gato) {
    nombre.innerHTML = `<b>Nombre:</b> ${gato.nombre}`;
    fNacimiento.innerHTML = `<b>Fecha nacimiento:</b> ${gato.fechaNacimiento}`;
    raza.innerHTML = `<b>Raza:</b> ${gato.raza}`;
    peso.innerHTML = `<b>Peso:</b> ${gato.peso} kg`;
  };

  let crearGato = function() {
    let nombres = ["Misifu", "Garfield", "Pepe", "Pixel"];
    let fechasNacimiento = [
      "December 17, 2000",
      "January 18, 1998",
      "February 8, 2005"
    ];
    let razas = ["Persa", "Siamés", "Bengala", "Siberiano"];

    let pesos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let nIndice = Math.floor(Math.random() * (nombres.length - 1 - 0)) + 0;
    let fNindice =
      Math.floor(Math.random() * (fechasNacimiento.length - 1 - 0)) + 0;
    let rIndice = Math.floor(Math.random() * (razas.length - 1 - 0)) + 0;

    let pIndice = Math.floor(Math.random() * (pesos.length - 1 - 0)) + 0;

    let gato = new Gato(
      nombres[nIndice],
      fechasNacimiento[fNindice],
      razas[rIndice],
      pesos[pIndice]
    );

    actualizarCampos(gato);

    spanError.style.display = "none";
    accion.innerHTML = `<img src="./images/queHacer.svg">`;

    return gato;
  };

  let jugar = function() {
    if (this.peso <= 1) {
      accion.innerHTML = `<img src="./images/muerto.svg">`;
      this.peso = 0;
      actualizarCampos(this);
      mostrarSpan("Has matado a " + this.nombre);
    } else {
      ocultarSpan();
      this.jugar();
      accion.innerHTML = `<img src="./images/jugando.svg">`;
      actualizarCampos(this);
    }
  };

  let comer = function() {
    if (this.peso >= 15) {
      accion.innerHTML = `<img src="./images/muerto.svg">`;
      this.peso = 16;
      actualizarCampos(this);
      mostrarSpan("Has matado a " + this.nombre);
    } else {
      ocultarSpan();
      this.comer();
      actualizarCampos(this);
      accion.innerHTML = `<img src="./images/comiendo.svg">`;
    }
  };

  let dormir = function() {
    ocultarSpan();
    accion.innerHTML = `<img src="./images/durmiendo.svg">`;
  };

  let ocultarSpan = function() {
    spanError.textContent = "";
    spanError.style.display = "none";
  };

  let mostrarSpan = function(msj) {
    spanError.textContent = msj;
    spanError.style.display = "block";
    spanError.style.background = "red";
  };

  window.addEventListener("load", init);
}
