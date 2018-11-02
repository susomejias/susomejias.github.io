/**
 * En una expresión regular, indica la utilidad de los campos .flag .options ¿Funciona en todos los navegadores?
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    flagsOptionsRegex();
  }

  let flagsOptionsRegex = function() {
    let regex1 = /\w/i;

    // Devuelve las banderas que usa la expresión regular
    console.log(regex1.flags);

    // no funciona en ningún navegador
    console.log(regex1.options);
  };

  window.addEventListener("load", init);
}
