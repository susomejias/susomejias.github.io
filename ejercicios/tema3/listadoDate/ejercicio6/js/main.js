/**
 * Crea el método incrementaDias() que incremente/decremente los días indicados. Admitirá como primer argumento un entero positivo/negativo que reperesente el número de días. El resto de argumentos representarán una fecha, similar a los argumentos del constructor Date().
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    console.log(incrementDays(3, "December 25, 2018"));
  }

  let incrementDays = function(days, pDate) {
    let date = new Date(pDate);

    if (days <= 0) {
      date.setDate(date.getDate() - parseInt(days * -1));
    } else if (days > 0) {
      date.setDate(date.getDate() + parseInt(days));
    }

    return date;
  };

  window.addEventListener("load", init);
}
