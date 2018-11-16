/**

Realiza la comprobación del dni.

Para ello, crea un formulario con tres campos: nombre, dni y fecha de nacimiento.

Al perder el foco de la caja de texto del DNI se realizará la comprobación. Aparecerá un mensaje (Derecha o abajo) en rojo, indicando:

formato incorrecto
letra incorrecta
introduce dni (si está vacío)
Utiliza los grupos para capturar el número y la letra. La letra puede estar en mayúscula o minúscula, separado o no por espacio/guión

 */
{
  let inputDni;
  let errSpan;
  const validLetters = [
    "T",
    "R",
    "W",
    "A",
    "G",
    "M",
    "Y",
    "F",
    "P",
    "D",
    "X",
    "B",
    "N",
    "J",
    "Z",
    "S",
    "Q",
    "V",
    "H",
    "L",
    "C",
    "K",
    "E"
  ];

  function init() {
    inputDni = document.getElementById("inputDNI");
    errSpan = document.getElementById("errSpan");

    inputDni.addEventListener("blur", validateDni);
    inputDni.addEventListener("focus", () => {
      errSpan.textContent = "";
      errSpan.classList.remove("error");
      errSpan.classList.remove("success");
    });
  }

  let validateDni = function() {
    let regexpDNI = /(\d{8})\s?-?([TRWAGMYFPDXBNJZSQVHLCKE])$/i;

    if (inputDni.value === "") {
      showError("Introduce dni");
    } else {
      if (!regexpDNI.test(inputDni.value)) {
        showError("Formato incorrecto");
      } else {
        showSuccess("DNI válido");
        console.log(regexpDNI.exec(inputDni.value));
        
        [, numbers, letter] = regexpDNI.exec(inputDni.value);

        let validLetter = validLetters[parseInt(numbers) % 23].toUpperCase();

        if (letter.toUpperCase() !== validLetter) {
          showError("Letra incorrecta");
        }
      }
    }
  };

  let showError = function(msj) {
    errSpan.textContent = msj;
    errSpan.classList.remove("success");
    errSpan.classList.add("error");
  };

  let showSuccess = function(msj) {
    errSpan.textContent = msj;
    errSpan.classList.remove("error");
    errSpan.classList.add("success");
  };

  window.addEventListener("load", init);
}
