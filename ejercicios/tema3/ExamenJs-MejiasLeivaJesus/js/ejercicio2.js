/**
 * @author Jesús Mejías Leiva
 */
{
  let nombre;
  let apellidos;
  let input;
  let atras;
  let spanError;
  let setValidate;

  function init() {
    nombre = document.getElementById("nombre");
    apellidos = document.getElementById("apellidos");
    input = document.getElementById("input");
    atras = document.getElementById("atras");
    spanError = document.getElementById("spanError");
    setValidate = new Set();

    input.addEventListener("blur", validateNombreApellidos);

    atras.addEventListener("click", ev => {
      ev.preventDefault;
      history.back();
    });
  }

  let ErrorException = function(msj, name) {
    this.message = msj;
    this.name = name;
  };

  let validarSetCollection = function(rnombre, apellido1, apellido2) {
    console.log(arguments);

    if (arguments.length === 2) {
      if (!setValidate.has(rnombre.trim())) {
        setValidate.add(rnombre.trim());
      } else {
        spanError.textContent += " (nombre repetido) ";
      }

      if (!setValidate.has(apellido1.trim())) {
        setValidate.add(apellido1.trim());
      } else {
        spanError.textContent += " (primer apellido repetido) ";
      }
    } else if (arguments.length === 3) {
      if (!setValidate.has(rnombre.trim())) {
        setValidate.add(rnombre.trim());
      } else {
        spanError.textContent += " (nombre repetido) ";
      }

      if (!setValidate.has(apellido1.trim())) {
        setValidate.add(apellido1.trim());
      } else {
        spanError.textContent += " (primer apellido repetido) ";
      }
      if (!setValidate.has(apellido2.trim())) {
        setValidate.add(apellido2.trim());
      } else {
        spanError.textContent += " (segundo apellido repetido) ";
      }
    }
  };
  let validateNombreApellidos = function() {
    let regex = /(\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)?(\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)?,(\s?[a-zA-záéíóúÁÉÍÓÚñÑ]+\s?)$/g;
    //let regex = /(\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?) (\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)+,(\s?[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?)$/g;

    let inputValue = input.value;
    //console.log(regex.exec(inputValue));

    let values = regex.exec(inputValue);

    console.log(values);

    try {
      if (values !== null) {
        if (values[2] === undefined) {
          spanError.textContent = "";
          [, apellido1, , rnombre] = values;
          nombre.textContent = `Nombre:  ${rnombre}`;
          apellidos.textContent = `Apellido:  ${apellido1}`;
          let arg = [rnombre, apellido1];
          validarSetCollection(...arg);
        } else {
          spanError.textContent = "";
          [, apellido1, apellido2, rnombre] = values;
          nombre.textContent = `Nombre:  ${rnombre}`;
          apellidos.textContent = `Apellido:  ${apellido1 + ", " + apellido2}`;
          let arg = [rnombre, apellido1, apellido2];
          validarSetCollection(...arg);
        }
      } else {
        let miErrorException = new ErrorException(
          "Error. Formato correcto: Cuadrado Perfecto, Anacleto",
          "error"
        );
        throw miErrorException;
      }

      // ejercicio 3

      //console.log(setValidate);
    } catch (e) {
      if (e instanceof ErrorException) {
        spanError.textContent = e.message;
      }
    }
  };
  window.addEventListener("load", init);
}
