/**
 * Indica las distintas formas de crear expresiones regulares.
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    createRegex();
  }

  let createRegex = function() {
    // a pelo guardando la expresión en una variable
    let regex1 = /\w/i;

    // utilizando el constructor
    let regex2 = new RegExp("/w/", "i");
  };

  window.addEventListener("load", init);
}
