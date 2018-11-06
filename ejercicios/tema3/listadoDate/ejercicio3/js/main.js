/**
 * Indica el formato del parámetro cadena del método Date.parse().
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    dateParse();
  }

  let dateParse = function() {
    // Transforma una cadena con la representación de una fecha y hora, y devuelve el número de milisegundos desde las 00:00:00 del 1 de enero de 1970, hora local.

    // Acepta la sintaxis del estándar IETF (en inglés):

    // Si no se especifica una zona horaria, se asumirá la zona de la hora local. GMT y UTC se consideran equivalentes.

    let dateParse = Date.parse("Aug 9, 1995");
    console.log("DATE PARSE ->> " + dateParse);
  };

  window.addEventListener("load", init);
}
