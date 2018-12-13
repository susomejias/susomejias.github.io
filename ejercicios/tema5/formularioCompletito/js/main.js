/**
 *
 * Validación de un formulario con todo tipo de campos mediante javascript vanilla.
 *
 * @author Jesús Mejias Leiva
 *
 **/

{
  // Declaramos las variable.

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

  let spanError;

  let collectionNoValidos;

  let init = function() {
    // Almacenando los elementos, en sus respectivas variables.

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

    test(patron,campo,elementoMostrarMensaje, mapKey){
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
    testDni(patron,campo, elementoMostrarMensaje){
        let regex = new RegExp(patron[0]);
        if (!regex.test(campo.value)) {
          elementoMostrarMensaje.textContent = "Formato incorrecto";
          collectionNoValidos.set(campo, campo);
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
    },




  };

  /**
   * Validará un nombre.
   */


  let validarNombre = function() {
    validador.test(patrones.nombre,nombre,lbNombre, "inputNombre");
  }

  let validarCuenta = function() {
    validador.test(patrones.cuentaCorriente,cuentaCorriente,lbCuenta,"inputCuenta");
  }

  let validarUrl = function() {
    validador.test(patrones.direccionWeb,direccionWeb,lbUrl, "inputUrl");
  }

  let validarCorreo = function() {
    validador.test(patrones.correo,correo,lbCorreo, "inputCorreo");
  }

  let validarTelefono = function() {
    validador.test(patrones.telefono,telefono,lbTelefono, "inputTelefono");
  }

  let validarDni = function (){
    validador.test(patrones.dni,dni,lbDni, "inputDni");
  }
  /**
   * Validará una fecha de nacimiento.
   */
  let validarFechaNacimiento = function() {
    let valorFecha = Date.parse(fechaNacimiento.value);
    let annoIntroducido;
    let annoActual;

    if (!isNaN(valorFecha)) {
      let fechaIntroducida = new Date(valorFecha);
      let fechaActual = new Date();

      annoIntroducido = fechaIntroducida.getFullYear();
      annoActual = fechaActual.getFullYear();
    }

    if (isNaN(valorFecha)) {
      lbFecha.innerHTML = "La fecha nacimiento no puede estar vacía";
      collectionNoValidos.set("fecha", fechaNacimiento);
    } else if (annoIntroducido > annoActual) {
      lbFecha.innerHTML =
        "La fecha nacimiento no puede ser superior a la fecha actual";
      collectionNoValidos.set("fecha", fechaNacimiento);
    } else {
      lbFecha.innerHTML = "";
      spanError.textContent = "";
      if (collectionNoValidos.has("fecha")) {
        collectionNoValidos.delete("fecha");
      }
    }
  };
  /**
   * Realizará la validación de todos los campos y apuntará el foco sobre el primer
   * campo que contenga errores.
   */
  let validar = function() {
    try {
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
