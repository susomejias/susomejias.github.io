/**
 * Implementa el método diaDeLaSemana() que devuelva 'lunes, martes... domingo' del día actual o de la fecha indicada (similar al constructor)
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    console.log(
      "DADA UNA FECHA POR PARÁMETRO ->> " + dayOfWeek("December 26, 2018")
    );
    console.log("SIN PARÁMETRO ->> " + dayOfWeek());
  }

  let dayOfWeek = function(pDate) {
    let date;
    if (arguments.length === 0) {
      date = new Date();
    } else if (arguments.length === 1) {
      date = new Date(pDate);
    }

    //console.log(date);

    let day = date.getDay();
    switch (day) {
      case 0:
        return "Domingo";
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miércoles";
      case 1:
        return "Jueves";
      case 2:
        return "Viernes";
      case 3:
        return "Sábado";
    }
  };

  window.addEventListener("load", init);
}
