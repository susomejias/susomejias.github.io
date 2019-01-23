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
    allinputs = Array.from(document.querySelectorAll("input:not([type='submit']):not([type='checkbox']):not([type='radio'])"));
    spanError = Array.from(document.getElementById("spanError"));
    spans = Array.from(document.querySelectorAll("body form span"));

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      validaSubmit();
    });

    validarAction(); // valida inputs cuando se active el evento blur
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
    ],
    number: [/^[1-9]{1,}$/, "El número tiene que ser mayor que 0."],

    fecha: [
      /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/,
      "El formato de fecha es yyyy-mm-dd."
    ]
  };

  /*
   * Objeto que valida mediante las expresiones regulares.
   */
  let validador = {
    test(patron, campo, elementoMostrarMensaje) {
      let regex = new RegExp(patron[0]);
      if (!regex.test(campo.value)) {
        elementoMostrarMensaje.textContent = patron[1];
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
  let validateInputs = function(element,spanIndex) {
    //element.getAttribute("class") obtenemos la clase de cada input con la cuál identificaremos el patron con el que se validará.
    if (element.getAttribute("class")) {
      validador.test(
        patrones[element.getAttribute("class")],
        element,
        spans[spanIndex]
      );
    }
  };
  /*
   * valida todos los inputs, según la acción que se le pase y según su type.
   * @param action especifica la acción que realiza, el valor "blur" activa las validaciones sobre un evento blur,
   * cualquier otro valor activa las validaciones directamente.
   */
  let validarAction = function(action) {
    allinputs.forEach(function(element, index) {
        if (action === "trigger"){
          element.addEventListener(
            "blur",
            function(){
              validateInputs(element,index);
            }());
        }else{
          element.addEventListener(
            "blur",
            function(){
              validateInputs(element,index);
            });
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
  * Devuelve un array con los indices de los span llenos.
  */
  let obtenerIndiceLlenos = function (){
    let indiceSpanLlenos = [];
    spans.forEach((element, index)=>{
      if (element.textContent !== ""){
        indiceSpanLlenos.push(index)
      }
    });

    return indiceSpanLlenos;
  }
  /*
   * Valida los inputs al hacer submit del formulario.
   */
  let validaSubmit = function() {
    validarAction("trigger")
   // valida todos los inputs

    // hacemos focus del input
    if (obtenerIndiceLlenos().length > 0){
      allinputs[obtenerIndiceLlenos()[0]].focus();
      return;
    }

      spanError.textContent = "";

      try {
        let reserva = new Reserva(
          allinputs[0].value,
          allinputs[1].value,
          new Date(allinputs[2].value),
          allinputs[3].value,
          allinputs[4].value,
          allinputs[5].value,
          checkPulsado(),
          radioPulsado()
        );
        reserva.mostrar(); // muestro los datos de la clase reserva en otra ventana
      } catch (e) {
        spanError.textContent = e.message;
      }
  };
  window.addEventListener("load", init);
}
