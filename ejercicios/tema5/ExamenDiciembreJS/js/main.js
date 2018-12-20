{
  let inputNombreCompleto;
  let inputCorreoElectronico;
  let fechaLlegada;
  let horaLlegada;
  let numNoches;
  let numPersonas;
  let spanNombre;
  let spanCorreo;
  let spanFllegada;
  let spanHoraLlegada;
  let spanNumNoches;
  let spanNumPersonas;
  let spanError;
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
      "Al menos nombre y apellido"
    ],
    hora: [
      /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g,
      "formato válido hh:mm"
    ],
    correo: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Formato de correo no válido"
    ]
  };

  let validador = {
    testNumber(campo, elementoMostrarMensaje, mapKey) {
      if (campo.value <= 0 || campo.value === "") {
        collectionNoValidos.set(mapKey, campo);
        if (campo.value <= 0) {
          elementoMostrarMensaje.textContent = "Valor no válido";
        }
        if (campo.value === "") {
          elementoMostrarMensaje.textContent = "Rellene este campo";
        }
      } else {
        validador.limpiar(mapKey, elementoMostrarMensaje, spanError);
      }
    },
    test(patron, campo, elementoMostrarMensaje, mapKey) {
      let regex = new RegExp(patron[0]);
      if (!regex.test(campo.value)) {
        collectionNoValidos.set(mapKey, campo);
        elementoMostrarMensaje.textContent = patron[1];
      } else {
        validador.limpiar(mapKey, elementoMostrarMensaje, spanError);
      }
    },
    testFecha(campo, elementoMostrarMensaje, mapKey) {
      let valorFecha = Date.parse(campo.value);

      if (isNaN(valorFecha)) {
        elementoMostrarMensaje.textContent =
          "La fecha de llegada no puede estar vacía";
        collectionNoValidos.set(mapKey, campo);
      } else {
        validador.limpiar(mapKey, elementoMostrarMensaje, spanError);
      }
    },
    limpiar(mapKey, spanElemento, spanError) {
      if (collectionNoValidos.has(mapKey)) {
        collectionNoValidos.delete(mapKey);
      }
      spanElemento.textContent = "";
      spanError.textContent = "";
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

  let validarFecha = () =>
    validador.testFecha(fechaLlegada, spanFllegada, "fechaLlegada");

  let validarNumNoches = () => {
    validador.testNumber(numNoches, spanNumNoches, "numNoches");
  };

  let validarNumPersonas = () =>
    validador.testNumber(numPersonas, spanNumPersonas, "numPersonas");

  let validarHoraLlegada = () =>
    validador.test(patrones.hora, horaLlegada, spanHoraLlegada, "horaLlegada");

  let radioPulsado = function() {
    let radios = Array.from(document.querySelectorAll("input[type='radio']"));
    let radioPulsado = [];
    radios.forEach(element => {
      if (element.checked) {
        radioPulsado.push(element.value);
      }
    });

    return radioPulsado[0];
  };

  let checkPulsado = function() {
    let checkboxs = Array.from(
      document.querySelectorAll("input[type='checkbox']")
    );
    let checkboxChecked = [];

    checkboxs.forEach(element => {
      if (element.checked) {
        checkboxChecked.push(element.value);
      }
    });
    return checkboxChecked;
  };

  let validar = function() {
    try {
      collectionNoValidos.clear();
      validarNombre();
      validarCorreo();
      validarFecha();
      validarHoraLlegada();
      validarNumNoches();
      validarNumPersonas();

      if (collectionNoValidos.size > 0) {
        spanError.textContent = "";
        collectionNoValidos.forEach(element => {
          element.focus();
          throw false;
        });
      } else if (collectionNoValidos.size === 0) {
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
      }
    } catch (e) {}
  };
  window.addEventListener("load", init);
}
