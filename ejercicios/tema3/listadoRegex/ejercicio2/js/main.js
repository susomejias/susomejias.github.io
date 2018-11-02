/**
 * En una expresión regular, indica la utilidad del campo .global. Indica otros métodos relacionados
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    globalRegex();
  }

  let globalRegex = function() {
    let regex1 = /\w/i;

    // Indica si se utiliza o no el indicador "g", para encontrar varias coincidencias
    console.log(regex1.global);

    // Indica si se utiliza o no el indicador "i", para obviar mayusculas y minusculas
    console.log(regex1.ignoreCase);

    // Indica si se utiliza o no el indicador "m", para el uso multilinea
    console.log(regex1.multiline);
  };

  window.addEventListener("load", init);
}
