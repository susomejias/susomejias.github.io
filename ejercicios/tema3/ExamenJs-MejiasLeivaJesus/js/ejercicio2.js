/**
 * @author Jesús Mejías Leiva
 */
{
  let msgNombre;
  let msgApellidos;
  let input;
  let atras;
  let spanError;
  let setValidate;

  function init() {
    msgNombre = document.getElementById("nombre");
    msgApellidos = document.getElementById("apellidos");
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
    let patron =
      "^((?:[a-záéíóúñ]{1,})(?:[ ]{1,}(?:[a-záéíóúñ]{1,}))*)" +
      "[ ]*,[ ]*" +
      "([a-záéíóúñ]{1,})$";

    let regex = new RegExp(patron, "i");

    let inputValue = input.value;

    let values = regex.exec(inputValue.trim());

    try {
      if (values !== null) {
        spanError.textContent = "";
        [, apellidos, rnombre] = values;

        msgNombre.innerHTML = `Nombre:  <b>${rnombre}</b>`;
        msgApellidos.innerHTML = `Apellidos:  <b>${apellidos.replace(
          /\s+/g,
          " "
        )}</b>`;

        let nombreCompleto = rnombre + apellidos.replace(/\s+/g, " ");

        if (!setValidate.has(nombreCompleto)) {
          setValidate.add(nombreCompleto);
        } else {
          spanError.textContent = "REPETIDO";
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
