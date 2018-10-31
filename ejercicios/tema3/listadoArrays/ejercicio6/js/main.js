/**
 * función que devuelva un array con cada uno de los argumentos. En caso de que alguno de sus argumentos sea un array, que introduzca sus elementos uno a uno.
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
