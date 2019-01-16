{
  let inputsText;
  let inputsMail;
  let inputsNumber;
  let inputsTime;
  let inputsDate;
  let spans;
  let form;
  let spanError;
  let allinputs;

  let collectionNoValidos;

  function init() {
    collectionNoValidos = new Map();
    form = document.getElementsByTagName("form")[0];
    inputsText = Array.from(document.querySelectorAll("input[type='text']"));
    inputsMail = Array.from(document.querySelectorAll("input[type='email']"));
    inputsNumber = Array.from(
      document.querySelectorAll("input[type='number']")
    );
    inputsTime = Array.from(document.querySelectorAll("input[type='time']"));
    inputsDate = Array.from(document.querySelectorAll("input[type='date']"));
    spans = Array.from(document.querySelectorAll("body span"));
    allinputs = Array.from(document.getElementsByTagName("input"));
    spanError = document.getElementById("spanError");

    spanError = document.getElementById("spanError");

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      validar();
    });

    allinputs.forEach(function(element, index) {
      switch (element.getAttribute("type")) {
        case "text":
          element.addEventListener(
            "blur",
            validarTest.bind(null, inputsText, index)
          );
          break;
        case "email":
          element.addEventListener(
            "blur",
            validarTest.bind(null, inputsMail, index)
          );
          console.log(collectionNoValidos);
          break;
        // case "number":
        //   element.addEventListener(
        //     "blur",
        //     validateInputsNumber.bind(null, index)
        //   );
        //   break;
        // case "date":
        //   element.addEventListener(
        //     "blur",
        //     validateInputsDate.bind(null, index)
        //   );
        //   break;
        default:
      }
    });
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

  let validarTest = function(pattern, spanIndex) {
    validador.test(
      patrones[pattern],
      inputNombreCompleto,
      spans[spanIndex],
      pattern
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
    return Array.from(
      document.querySelectorAll("input[type='radio']:checked")
    )[0].value;
  };

  let checkPulsado = function() {
    console.log(
      Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    );
    return Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    );
  };

  let validar = function() {
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
        return false;
      });
    }
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
    }
  };
  window.addEventListener("load", init);
}
