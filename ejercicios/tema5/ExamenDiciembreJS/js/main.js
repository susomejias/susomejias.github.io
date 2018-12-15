{
  let inputNombreCompleto;
  let inputCorreoElectronico;
  let fechaLlegada;
  let horaLlegada;
  let numNoches;
  let numPersonas;
  let radioDesayuno;
  let radioAlmuerzo;
  let radioCena;
  let checkDesayuno;
  let checkAlmuerzo;
  let checkCena;
  let spanNombre;
  let spanCorreo;
  let spanFllegada;
  let spanHoraLlegada;
  let spanNumNoches;
  let spanNumPersonas;
  let spanError;
  let btnEnviar;
  let collectionNoValidos;

  function init() {
    collectionNoValidos = new Map();
    let form = document.getElementsByTagName("form")[0];
    inputNombreCompleto = document.getElementById("inputNombreCompleto");
    inputCorreoElectronico = document.getElementById("inputCorreoElectrónico");
    fechaLlegada = document.getElementById("inputFechaLlegada");
    horaLlegada = document.getElementById("inputHoraLlegada");
    numNoches = document.getElementById("inputNumeroNoches");
    numPersonas = document.getElementById("inputNumeroPersonas");
    checkDesayuno = document.getElementById("desayuno");
    checkAlmuerzo = document.getElementById("almuerzo");
    checkCena = document.getElementById("cena");
    radioMenos20 = document.getElementById("menosDe20");
    radio20y40 = document.getElementById("entre20y40");
    radioMasDe40 = document.getElementById("masDe40");
    spanNombre = document.getElementById("spanNombre");
    spanCorreo = document.getElementById("spanCorreo");
    spanFllegada = document.getElementById("spanFllegada");
    spanHoraLlegada = document.getElementById("spanHoraLlegada");
    spanNumNoches = document.getElementById("spanNumNoches");
    spanNumPersonas = document.getElementById("spanNumPersonas");
    spanError = document.getElementById("spanError");
    btnEnviar = document.getElementById("enviarReserva");

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      validar();
    });

    inputNombreCompleto.addEventListener("blur", validarNombre);
    inputCorreoElectronico.addEventListener("blur", validarCorreo);
    fechaLlegada.addEventListener("blur", validarFecha);
    numNoches.addEventListener("blur", validarNumNoches);
    numPersonas.addEventListener("blur", validarNumPersonas);
    horaLlegada.addEventListener("blur", validarHoraLlegada);
  }

  let patrones = {
    nombre: [
      /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ]+[/\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ])+[/\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ])?$/g,
      "Mínimo de tres caractéres por nombre, al menos nombre y apellido"
    ],
    hora: [/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g, "hh:mm"],
    correo: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Formato de correo no válido"
    ]
  };

  let validador = {
    testNumber(campo, elementoMostrarMensaje, mapKey) {
      if (campo.value < 0) {
        collectionNoValidos.set(mapKey, campo);
        elementoMostrarMensaje.textContent = patron[1];
      } else {
        if (collectionNoValidos.has(mapKey)) {
          collectionNoValidos.delete(mapKey);
        }
        elementoMostrarMensaje.textContent = "";
        spanError.textContent = "";
      }
    },
    test(patron, campo, elementoMostrarMensaje, mapKey) {
      let regex = new RegExp(patron[0]);
      if (!regex.test(campo.value)) {
        collectionNoValidos.set(mapKey, campo);
        elementoMostrarMensaje.textContent = patron[1];
      } else {
        if (collectionNoValidos.has(mapKey)) {
          collectionNoValidos.delete(mapKey);
        }
        elementoMostrarMensaje.textContent = "";
        spanError.textContent = "";
      }
    },
    testFecha(campo, elementoMostrarMensaje, mapKey) {
      let valorFecha = Date.parse(campo.value);
      let annoIntroducido;
      let annoActual;

      if (!isNaN(valorFecha)) {
        let fechaIntroducida = new Date(valorFecha);
        let fechaActual = new Date();

        annoIntroducido = fechaIntroducida.getFullYear();
        mesIntroducido = fechaIntroducida.getMonth() + 1;
        diaIntroducido = fechaIntroducida.getDay();

        annoActual = fechaActual.getFullYear();
        mesActual = fechaActual.getMonth() + 1;
        diaActual = fechaActual.getDay();
      }

      if (isNaN(valorFecha)) {
        elementoMostrarMensaje.textContent =
          "La fecha nacimiento no puede estar vacía";
        collectionNoValidos.set(mapKey, campo);
      } else if (
        annoIntroducido > annoActual ||
        ((annoIntroducido === annoActual && mesIntroducido > mesActual) ||
          (annoIntroducido === annoActual &&
            mesIntroducido === mesActual &&
            diaIntroducido > diaActual))
      ) {
        elementoMostrarMensaje.textContent =
          "La fecha nacimiento no puede ser superior a la fecha actual";
        collectionNoValidos.set(mapKey, campo);
      } else {
        elementoMostrarMensaje.textContent = "";
        spanError.textContent = "";
        if (collectionNoValidos.has(mapKey)) {
          collectionNoValidos.delete(mapKey);
        }
      }
      //console.log(collectionNoValidos);
    }
  };

  let validarNombre = function() {
    validador.test(
      patrones.nombre,
      inputNombreCompleto,
      spanNombre,
      "nombreCompleto"
    );
  };

  let validarCorreo = function() {
    validador.test(
      patrones.correo,
      inputCorreoElectronico,
      spanCorreo,
      "correoElectronico"
    );
  };

  let validarFecha = function() {
    validador.testFecha(fechaLlegada, spanFllegada, "fechaLlegada");
  };
  let validarNumNoches = function() {
    validador.testNumber(numNoches, spanNumNoches, "numNoches");
  };
  let validarNumPersonas = function() {
    validador.testNumber(numPersonas, spanNumPersonas, "numPersonas");
  };
  let validarHoraLlegada = function() {
    validador.test(patrones.hora, horaLlegada, spanHoraLlegada, "horaLlegada");
  };

  let radioPulsado = function() {
    if (radio20y40.checked) {
      return radio20y40.value;
    } else if (radioMenos20.checked) {
      return radioMenos20.value;
    } else if (radioMasDe40.checked) {
      return radioMasDe40.value;
    }
  };

  let checkPulsado = function() {
    if (checkAlmuerzo.checked) {
      return checkAlmuerzo.value;
    } else if (checkDesayuno.checked) {
      return checkDesayuno.value;
    } else if (checkCena.checked) {
      return checkCena.value;
    }
  };

  let validar = function() {
    try {
      // valida radio button
      //validador.testRadio();
      // valida checkbox
      //validador.testCheckbox();

      if (
        inputNombreCompleto.value === "" &&
        inputCorreoElectronico.value === "" &&
        fechaLlegada.value === "" &&
        horaLlegada.value === "" &&
        numNoches.value === "" &&
        numPersonas.value === ""
      ) {
        spanError.textContent = "Rellene los campos";
        collectionNoValidos.forEach(element => {
          element.focus();
          throw false;
        });
      } else {
        if (collectionNoValidos.size === 0) {
          spanError.textContent = "";
          try {
            let reserva = new Reserva(
              inputNombreCompleto.value,
              inputCorreoElectronico.value,
              new Date(fechaLlegada.value),
              horaLlegada.value,
              numNoches.value,
              numPersonas.value,
              checkPulsado(),
              radioPulsado()
            );
            reserva.mostrar();
          } catch (e) {
            spanError.textContent = e.message;
          }
        } else {
          spanError.textContent = "";
          collectionNoValidos.forEach(element => {
            element.focus();
            throw false;
          });
        }
      }
    } catch (e) {}
  };

  //   let validar = function() {
  //     // no me ha dado tiempo

  //     // if (validarNombre() && validarCorreo()  && validarFecha() && validarHoraLlegada() !== "" && numNoches.value !== "" && numPersonas.value !== "" && numPersonas.value !== "" )

  //     if (
  //       inputNombreCompleto.value !== "" &&
  //       inputCorreoElectronico.value !== "" &&
  //       fechaLlegada.value !== "" &&
  //       horaLlegada.value !== "" &&
  //       numNoches.value !== "" &&
  //       numPersonas.value !== "" &&
  //       numPersonas.value !== ""
  //     ) {
  //       try {
  //         let reserva = new Reserva(
  //           inputNombreCompleto.value,
  //           inputCorreoElectronico.value,
  //           new Date(fechaLlegada.value),
  //           horaLlegada.value,
  //           numNoches.value,
  //           numPersonas.value,
  //           "",
  //           radioPulsado.value
  //         );
  //         reserva.mostrar();
  //       } catch (e) {
  //         spanError.textContent = e.message;
  //       }
  //     }
  //   };

  window.addEventListener("load", init);
}
