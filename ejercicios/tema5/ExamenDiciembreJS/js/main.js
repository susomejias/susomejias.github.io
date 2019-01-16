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

  function init() {
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

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      validar();
    });

    validaBlur(true);
  }

  let patrones = {
    nombreCompleto: [
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
    testNumber(campo, elementoMostrarMensaje) {
      if (campo.value <= 0 || campo.value === "") {
        if (campo.value <= 0) {
          elementoMostrarMensaje.textContent = "Valor no válido";
        }
        if (campo.value === "") {
          elementoMostrarMensaje.textContent = "Rellene este campo";
        }
      } else {
        validador.limpiar(elementoMostrarMensaje, spanError);
      }
    },
    test(patron, campo, elementoMostrarMensaje) {
      let regex = new RegExp(patron[0]);
      if (!regex.test(campo.value)) {
        elementoMostrarMensaje.textContent = patron[1];
      } else {
        validador.limpiar(elementoMostrarMensaje, spanError);
      }
    },
    testFecha(campo, elementoMostrarMensaje) {
      let valorFecha = Date.parse(campo.value);

      if (isNaN(valorFecha)) {
        elementoMostrarMensaje.textContent =
          "La fecha de llegada no puede estar vacía";
      } else {
        validador.limpiar(elementoMostrarMensaje, spanError);
      }
    },
    limpiar(spanElemento, spanError) {
      spanElemento.textContent = "";
      spanError.textContent = "";
    }
  };

  let validateInputs = function(element, spanIndex) {
    if (element.getAttribute("id")) {
      validador.test(
        patrones[element.getAttribute("id")],
        element,
        spans[spanIndex],
        element.getAttribute("id")
      );
    }
  };

  let validateInputsNumber = function(element, spanIndex) {
    validador.testNumber(element, spans[spanIndex]);
  };

  let validateInputsDate = function(element, spanIndex) {
    validador.testFecha(element, spans[spanIndex]);
  };

  let validaBlur = function validaBlur(isBlur) {
    allinputs.forEach(function(element, index) {
      switch (element.getAttribute("type")) {
        case "text":
          if (isBlur) {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        case "email":
          if (isBlur) {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        case "number":
          if (isBlur) {
            element.addEventListener(
              "blur",
              validateInputsNumber.bind(null, element, index)
            );
          } else {
            validateInputsNumber(element, index);
          }
          break;
        case "date":
          if (isBlur) {
            element.addEventListener(
              "blur",
              validateInputsDate.bind(null, element, index)
            );
          } else {
            validateInputsDate(element, index);
          }
          break;
        case "time":
          if (isBlur) {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        default:
      }
    });
  };
  let radioPulsado = function() {
    return Array.from(
      document.querySelectorAll("input[type='radio']:checked")
    )[0].value;
  };

  let checkPulsado = function() {
    return Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    );
  };

  let isEmptySpan = function() {
    let emptySpan = 0;
    spans.forEach(element => {
      if (element.textContent === "") {
        emptySpan++;
      }
    });

    if (emptySpan === 0) {
      return true;
    } else {
      return false;
    }
  };

  let validar = function() {
    validaBlur(false);
    try {
      spans.forEach((element, index) => {
        console.log(element.textContent);
        if (element.textContent !== "") {
          allinputs[index].focus();
          throw false;
        }
      });
      spanError.textContent = "";
      try {
        let reserva = new Reserva(
          inputsText[0].value,
          inputsMail[0].value,
          new Date(inputsDate[0].value),
          inputsTime[0].value,
          inputsNumber[0].value,
          inputsNumber[1].value,
          checkPulsado(),
          radioPulsado()
        );
        reserva.mostrar();
      } catch (e) {
        spanError.textContent = e.message;
      }
    } catch (e) {}
  };
  window.addEventListener("load", init);
}
