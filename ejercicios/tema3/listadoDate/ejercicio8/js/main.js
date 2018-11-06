/**
 * Implementa el método esBisiesto() que devuelva si una fecha/año es bisiesto o no. En caso de que el argumento no sea una fecha, que salte una excepción. Admitirá tantos parámetros como el constructor Date(). Pruébalo con varias invocaciones fallidas (y capturadas)
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    // invocación correcta, no salta la exception
    try {
      console.log(leapYear("December 25, 2018"));
    } catch (e) {
      console.log(e.message);
    }

    // invocación fallida, salta la exception
    try {
      console.log(leapYear("pepe"));
    } catch (e) {
      console.log(e.message);
    }
  }

  let dateNotValid = function(msg, name) {
    this.message = msg;
    this.name = name;
  };

  let leapYear = function(pDate) {
    if (!isNaN(Date.parse(pDate))) {
      let date = new Date(pDate);
      let yearDate = date.getFullYear();
      console.log(yearDate);

      if ((yearDate % 100 != 0 && yearDate % 4 === 0) || yearDate % 400 === 0) {
        return "El año es bisiesto";
      } else {
        return "El año no es bisiesto";
      }
    } else {
      let dNotValid = new dateNotValid(
        "Fecha introducida, no válida",
        "Fecha no válida"
      );

      throw dNotValid;
    }
  };

  window.addEventListener("load", init);
}
