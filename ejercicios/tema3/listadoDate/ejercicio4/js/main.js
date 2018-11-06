/**
 * Implementa el método esFecha() que devuelva si el argumento es una fecha o no.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    console.log(isDate("Aug 9, 1995")); // Salida, fecha válida
    console.log(isDate("Sep 46, 2020")); // Salida, fecha no válida
  }

  let isDate = function(date) {
    //console.log(!isNaN(Date.parse(date)));
    if (!isNaN(Date.parse(date))) {
      return "Fecha válida";
    } else {
      return "Fecha no válida";
    }
  };

  window.addEventListener("load", init);
}
