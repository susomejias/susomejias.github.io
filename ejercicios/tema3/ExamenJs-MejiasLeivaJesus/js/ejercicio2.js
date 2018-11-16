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

  let validateNombreApellidos = function() {
    let regex = /(\s?[a-zA-z]+\s?) (\s?[a-zA-z]+\s?)+,(\s?[a-zA-z]+\s?)$/g;

    let inputValue = input.value;

    let values = regex.exec(inputValue);

    try {
      console.log(regex.exec(inputValue));
      if (regex.test(inputValue)) {
        if (values !== null) {
          spanError.textContent = "";
          [, apellido1, apellido2, rnombre] = values;
          nombre.textContent = `Nombre:  ${rnombre}`;
          apellidos.textContent = `Apellido:  ${apellido1 + ", " + apellido2}`;
        }
      } else {
        let miErrorException = new ErrorException(
          "Error. Formato correcto: Cuadrado Perfecto, Anacleto",
          "error"
        );
        throw miErrorException;
      }

      // ejercicio 3

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

      //console.log(setValidate);
    } catch (e) {
      spanError.textContent = e.message;
    }
  };
  window.addEventListener("load", init);
}
