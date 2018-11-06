/**
 * Implementa el método fecha() que devuelva una fecha válida. Lanzará una excepción en caso contrario.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    try {
      date();
    } catch (e) {
      console.log(e.message);
    }
  }

  // creo mi exception personalizada
  let dateNotValid = function(msg, name) {
    this.message = msg;
    this.name = name;
  };

  let date = function() {
    let date = new Date("Diciembre 17, 1995 03:24:00");

    if (date == "Invalid Date") {
      // creo mi un objeto con mi exception personalizada
      let dNotValid = new dateNotValid(
        "Fecha introducida, no válida",
        "Fecha no válida"
      );
      // lanzo la exception
      throw dNotValid;
    } else {
      return date;
    }
  };

  window.addEventListener("load", init);
}
