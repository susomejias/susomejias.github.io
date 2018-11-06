/**
 * Implementa el método calcularHastaFinDeAnno() que devuelva los días que quedan hasta fin de año.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    console.log(calculateEndYear());
  }

  let calculateEndYear = function() {
    let dateNow = new Date();

    let dateNowMilis = Date.now();
    let date = Date.parse("December 31, " + dateNow.getFullYear());

    let days = dateNowMilis - date;

    return (
      "Quedan " + Math.round((days / 86400000) * -1) + " dias para año nuevo"
    );
  };

  window.addEventListener("load", init);
}
