/**
 * Mediante ejemplos, indica valores y utilidad de index y lastIndex en una expresión regular. ¿Funciona en todos los navegadores?
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    indexLastIndex();
  }

  let indexLastIndex = function() {
    let regex1 = /\w/i;

    // índice en el que se inicia la siguiente coincidencia.
    console.log(regex1.lastIndex);
  };

  window.addEventListener("load", init);
}
