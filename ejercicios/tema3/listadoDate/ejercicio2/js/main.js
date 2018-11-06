/**
 * Indica la utilidad de Date.now();
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    dateNow();
  }

  let dateNow = function() {
    // Devuelve una fecha actual en milisegundos, podremos convertirla mediantes cálculos a dias, meses, años, aunque perderemos precisión, ya que todos los años no tienen los mismo dias, ni todos los meses tampoco.
    let milisDate = Date.now();
    console.log("FECHA MILISEGUNDOS ->> " + milisDate);
  };

  window.addEventListener("load", init);
}
