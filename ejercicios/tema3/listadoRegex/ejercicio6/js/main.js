/**
 * Mediante ejemplos, indica valores y utilidad de lastMatch en una expresión regular. ¿Funciona en todos los navegadores?
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    lastMatch();
  }

  let lastMatch = function() {
    let regex1 = /coucou/g;

    // Es una propiedad estática de solo lectura para expresiones regulares que contiene los caracteres de la última coincidencia. RegExp. $ & Es un alias para esta propiedad.
    // Es una propiedad que todavia no la soportan todos los navegadores
    console.log(regex1.lastMatch);
  };

  window.addEventListener("load", init);
}
