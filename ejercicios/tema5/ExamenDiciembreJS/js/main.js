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

  let init = function() {
    form = document.getElementsByTagName("form")[0];
    inputsText = Array.from(document.querySelectorAll("input[type='text']"));
    inputsMail = Array.from(document.querySelectorAll("input[type='email']"));
    inputsNumber = Array.from(
      document.querySelectorAll("input[type='number']")
    );
    inputsTime = Array.from(document.querySelectorAll("input[type='time']"));
    inputsDate = Array.from(document.querySelectorAll("input[type='date']"));
    allinputs = Array.from(document.querySelectorAll("input"));
    spanError = document.getElementById("spanError");

    // obtenemos los span que contengan una clase propia, para evitar span de extensiones etc
    spans = Array.from(document.querySelectorAll(".spanMsgError"));

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      validaSubmit();
    });

    validarAction("blur"); // valida inputs cuando se active el evento blur
  };

  /*
   * Objeto para reutilizar los patrones para las regex
   */
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

  /*
   * Objeto que valida mediante las expresiones regulares.
   */
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

  /*
   * Valida los inputs genéricos.
   * @param element elemento del DOM con el que trabajaremos.
   * @param spanIndex indice del elemento span donde mostraremos los mensajes.
   */
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

  /*
   * Valida los inputs numbers.
   * @param element elemento del DOM con el que trabajaremos.
   * @param spanIndex indice del elemento span donde mostraremos los mensajes.
   */
  let validateInputsNumber = function(element, spanIndex) {
    validador.testNumber(element, spans[spanIndex]);
  };

  /*
   * Valida los inputs date.
   * @param element elemento del DOM con el que trabajaremos.
   * @param spanIndex indice del elemento span donde mostraremos los mensajes.
   */
  let validateInputsDate = function(element, spanIndex) {
    validador.testFecha(element, spans[spanIndex]);
  };

  /*
   * valida todos los inputs, según la acción que se le pase y según su type.
   * @param action especifica la acción que realiza, el valor "blur" activa las validaciones sobre un evento blur,
   * cualquier otro valor activa las validaciones directamente.
   */
  let validarAction = function(action) {
    allinputs.forEach(function(element, index) {
      switch (element.getAttribute("type")) {
        case "text":
          if (action === "blur") {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        case "email":
          if (action === "blur") {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        case "number":
          if (action === "blur") {
            element.addEventListener(
              "blur",
              validateInputsNumber.bind(null, element, index)
            );
          } else {
            validateInputsNumber(element, index);
          }
          break;
        case "date":
          if (action === "blur") {
            element.addEventListener(
              "blur",
              validateInputsDate.bind(null, element, index)
            );
          } else {
            validateInputsDate(element, index);
          }
          break;
        case "time":
          if (action === "blur") {
            element.addEventListener(
              "blur",
              validateInputs.bind(null, element, index)
            );
          } else {
            validateInputs(element, index);
          }
          break;
        default:
          break;
      }
    });
  };

  /*
   * Devuelve el input radio seleccionado.
   */
  let radioPulsado = function() {
    return Array.from(
      document.querySelectorAll("input[type='radio']:checked")
    )[0].value;
  };

  /*
   * Devuelve el input checkbox seleccionado.
   */
  let checkPulsado = function() {
    return Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    );
  };

  /*
   * Valida los inputs al hacer submit del formulario.
   */
  let validaSubmit = function() {
    validarAction("submitAction"); // valida todos los inputs
    try {
      spans.forEach((element, index) => {
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
        reserva.mostrar(); // muestro los datos de la clase reserva en otra ventana
      } catch (e) {
        spanError.textContent = e.message;
      }
    } catch (e) {} // capturo la exception trow false, para terminar el foreach cuando haga foco sobre un elemento
  };
  window.addEventListener("load", init);
}
