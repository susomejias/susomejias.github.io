/**
 *
 * Validación de un formulario con todo tipo de campos mediante javascript vanilla.
 *
 * @author Jesús Mejias Leiva
 *
 **/

{
  let nombre;
  let lbNombre;
  let correo;
  let lbCorreo;
  let dni;
  let lbDni;
  let fechaNacimiento;
  let lbFecha;
  let telefono;
  let lbTelefono;
  let cuentaCorriente;
  let lbCuenta;
  let direccionWeb;
  let lbUrl;
  let formulario;
  let enviaFormulario;
  let radioSexoMujer;
  let radioSexoHombre;
  let checkboxTerminos;

  let spanError;

  let collectionNoValidos;

  let init = function() {
    collectionNoValidos = new Map();
    formulario = document.getElementById("formulario");

    nombre = document.getElementById("inputNombre");
    lbNombre = document.getElementById("lbNombre");

    correo = document.getElementById("inputCorreo");
    lbCorreo = document.getElementById("lbCorreo");

    dni = document.getElementById("inputDni");
    lbDni = document.getElementById("lbDni");

    fechaNacimiento = document.getElementById("inputFecha");
    lbFecha = document.getElementById("lbFechaNacimiento");

    telefono = document.getElementById("inputTelefono");
    lbTelefono = document.getElementById("lbTelefono");

    cuentaCorriente = document.getElementById("inputCuenta");
    lbCuenta = document.getElementById("lbCuenta");

    direccionWeb = document.getElementById("inputUrl");
    lbUrl = document.getElementById("lbUrl");

    enviaFormulario = document.getElementById("enviaFormulario");

    radioSexoMujer = document.getElementById("radioMujer");
    radioSexoHombre = document.getElementById("radioHombre");
    checkboxTerminos = document.getElementById("checkboxTerminos");

    spanError = document.getElementById("spanError");

    // Asignamos que al perder el foco haga una función.

    nombre.addEventListener("blur", validarNombre);
    correo.addEventListener("blur", validarCorreo);
    dni.addEventListener("blur", validarDni);
    fechaNacimiento.addEventListener("blur", validarFechaNacimiento);
    telefono.addEventListener("blur", validarTelefono);
    cuentaCorriente.addEventListener("blur", validarCuenta);
    direccionWeb.addEventListener("blur", validarUrl);

    // Asiganmos el evento click al boton que enviaría el formulario,
    // y le quitamos la acción de enviar el formulario que tendría por defecto,
    // y llamamos a la función validar(), la cuál validará los campos.

    enviaFormulario.addEventListener("click", function(event) {
      event.preventDefault();
      validar();
    });

    //cargarDatosPruebas();
  };

  let patrones = {
    nombre: [
      /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ]+[/\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ])+[/\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ])?$/g,
      "Mínimo de tres caractéres por nombre, al menos nombre y apellido"
    ],
    telefono: [/[0-9]{9,}/, "El formato de teléfono introducido es incorrecto"],
    dni: [
      /(\d{8})\s?-?([TRWAGMYFPDXBNJZSQVHLCKE])$/i,
      "Formato válido 12345678z",
      "La letra introducida no es válida"
    ],
    correo: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Formato de correo no válido"
    ],
    cuentaCorriente: [
      /[/\d]{20}/,
      "Error en el formato de la cuenta corriente"
    ],
    direccionWeb: [
      /^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi,
      "Error en el formato de la dirección web"
    ]
  };

  let validador = {
    /**
     * Valida un input
     * @param patron patron de busqueda para el regex
     * @param campo input a validar
     * @param elementoMostrarMensaje elemento del DOM, donde se mostrarán los mensaje pertinentes
     * @param mapKey key que se usará en la collection map para añadir y eliminar elementos
     */
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
      //console.log(collectionNoValidos);
    },
    /**
     * Valida un input dni
     * @param patron patron de busqueda para el regex
     * @param campo input a validar
     * @param elementoMostrarMensaje elemento del DOM, donde se mostrarán los mensaje pertinentes
     * @param mapKey key que se usará en la collection map para añadir y eliminar elementos
     */
    testDni(patron, campo, elementoMostrarMensaje, mapKey) {
      let regex = new RegExp(patron[0]);
      if (!regex.test(campo.value)) {
        elementoMostrarMensaje.textContent = "Formato incorrecto";
        collectionNoValidos.set(mapKey, campo);
      } else {
        elementoMostrarMensaje.textContent = "DNI válido";
        if (collectionNoValidos.has(mapKey)) {
          collectionNoValidos.delete(mapKey);
        }
        elementoMostrarMensaje.textContent = "";
        spanError.textContent = "";

        [, numbers, letter] = regex.exec(campo.value);

        let validLetter = validLetters[parseInt(numbers) % 23].toUpperCase();

        if (letter.toUpperCase() !== validLetter) {
          elementoMostrarMensaje.textContent = "Letra incorrecta";
          collectionNoValidos.set(campo, campo);
        }
      }
      //console.log(collectionNoValidos);
    },
    /**
     * Valida un input fechaNacimiento
     * @param campo input a validar
     * @param elementoMostrarMensaje elemento del DOM, donde se mostrarán los mensaje pertinentes
     * @param mapKey key que se usará en la collection map para añadir y eliminar elementos
     */
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
    },
    testRadio() {
      if (!radioSexoHombre.checked && !radioSexoMujer.checked) {
        collectionNoValidos.set("radioMujer", radioSexoMujer);
      } else {
        spanError.textContent = "";
        if (collectionNoValidos.has("radioMujer")) {
          collectionNoValidos.delete("radioMujer");
        }
      }
      //console.log(collectionNoValidos);
    },
    testCheckbox() {
      if (!checkboxTerminos.checked) {
        collectionNoValidos.set("checkBoxTerminos", checkboxTerminos);
      } else {
        spanError.textContent = "";
        if (collectionNoValidos.has("checkBoxTerminos")) {
          collectionNoValidos.delete("checkBoxTerminos");
        }
      }
      console.log(collectionNoValidos);
    }
  };

  let validarNombre = function() {
    validador.test(patrones.nombre, nombre, lbNombre, "inputNombre");
  };

  let validarCuenta = function() {
    validador.test(
      patrones.cuentaCorriente,
      cuentaCorriente,
      lbCuenta,
      "inputCuenta"
    );
  };

  let validarUrl = function() {
    validador.test(patrones.direccionWeb, direccionWeb, lbUrl, "inputUrl");
  };

  let validarCorreo = function() {
    validador.test(patrones.correo, correo, lbCorreo, "inputCorreo");
  };

  let validarTelefono = function() {
    validador.test(patrones.telefono, telefono, lbTelefono, "inputTelefono");
  };

  let validarDni = function() {
    validador.test(patrones.dni, dni, lbDni, "inputDni");
  };

  let validarFechaNacimiento = function() {
    validador.testFecha(fechaNacimiento, lbFecha, "inputFecha");
  };

  let cargarDatosPruebas = function() {
    nombre.value = "jesus mejias leiva";
    dni = "20227031a";
    radioSexoHombre.checked = true;
    correo.value = "jesusmejias.jm@gmail.com";
    cuentaCorriente.value = 12345678901234567890;
    telefono.value = 671795216;
    direccionWeb.value =
      "https://es.stackoverflow.com/questions/35874/validar-en-dos-grupos-diferentes-de-radio-buttons";
  };

  /**
   * Realizará la validación de todos los campos y apuntará el foco sobre el primer
   * campo que contenga errores.
   */
  let validar = function() {
    try {
      // valida radio button
      validador.testRadio();
      // valida checkbox
      validador.testCheckbox();

      if (
        nombre.value === "" ||
        dni.value === "" ||
        correo.value === "" ||
        cuentaCorriente.value === "" ||
        fechaNacimiento.value === "" ||
        telefono.value === "" ||
        direccionWeb.value === ""
      ) {
        spanError.textContent = "Rellene los campos";
        collectionNoValidos.forEach(element => {
          element.focus();
          throw false;
        });
      } else {
        if (collectionNoValidos.size === 0) {
          spanError.textContent = "";
          alert("se enviaría el formulario");
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

  window.addEventListener("load", init);
}
