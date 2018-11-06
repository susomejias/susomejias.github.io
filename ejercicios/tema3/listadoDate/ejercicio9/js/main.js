/**
 * Implementa el método calcularEdad() que devuelva la edad indicando la fecha de nacimiento.  En caso de tener menos de un año, indicar días y date.getMonth()es transcurridos. Indicar errores.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    // invocación correcta, no salta la exception
    try {
      console.log(calculateAge("June 28, 1997"));
    } catch (e) {
      console.log(e.message);
    }

    // invocación fallida, salta la exception
    try {
      console.log(calculateAge("pepe"));
    } catch (e) {
      console.log(e.message);
    }
  }

  let dateNotValid = function(msg, name) {
    this.message = msg;
    this.name = name;
  };

  let calculateAge = function(pDate) {
    if (!isNaN(Date.parse(pDate))) {
      let dateNow = new Date();
      let date = new Date(pDate);

      let age = dateNow.getFullYear() - date.getFullYear();

      let months = 0;
      let days = 0;

      if (dateNow.getMonth() < date.getMonth()) {
        age--;
      }
      if (
        dateNow.getDay() < date.getDay() &&
        dateNow.getMonth() <= date.getMonth()
      ) {
        age--;
      }

      if (
        dateNow.getMonth() > date.getMonth() &&
        date.getDay() > dateNow.getDay()
      ) {
        months = dateNow.getMonth() - date.getMonth() - 1;
      } else if (dateNow.getMonth() > date.getMonth()) {
        months = dateNow.getMonth() - date.getMonth();
      }

      if (
        dateNow.getMonth() < date.getMonth() &&
        date.getMonth() < dateNow.getMonth()
      ) {
        months = 12 - (date.getMonth() - dateNow.getMonth());
      } else if (dateNow.getMonth() < date.getMonth()) {
        months = 12 - (date.getMonth() - dateNow.getMonth() + 1);
      }
      if (
        dateNow.getMonth() == date.getMonth() &&
        date.getMonth() > dateNow.getMonth()
      ) {
        months = 11;
      }

      if (dateNow.getMonth() > date.getMonth())
        days = dateNow.getMonth() - date.getMonth();
      if (dateNow.getMonth() < date.getMonth()) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        days = ultimoDiaMes.getDate() - (date.getMonth() - dateNow.getMonth());
      }

      return (
        "Tienes " +
        age +
        " año/s" +
        ", " +
        months +
        " mes/es y " +
        days +
        " dia/s"
      );
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
