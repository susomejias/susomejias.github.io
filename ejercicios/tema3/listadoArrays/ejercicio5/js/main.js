/**
 * Crea  una función que devuelva un array con cada uno de los argumentos.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    argumentsArray("pepe");
  }

  let argumentsArray = function() {
    console.log(arguments);
  };

  window.addEventListener("load", init);
}
