/**
 * En una expresión regular, indica la utilidad del campo .source. Diferencia con toString()
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    sourceTostring();
  }

  let sourceTostring = function() {
    let regex1 = /\w/i;

    // Devuelve la expresión regular sin banderas
    console.log(regex1.source);

    // Devuelve la expresión regular, con todasmsun banderas, con la sintaxis con la que está escrita
    console.log(regex1.toString());
  };

  window.addEventListener("load", init);
}
