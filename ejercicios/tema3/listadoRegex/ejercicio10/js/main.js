/**
 * Busca en el objeto String funciones que simulen la funcionalidad de exec()
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    stringExec();
  }

  let stringExec = function() {
    let regex1 = /coucou/g;

    let str = "coucou";

    // Propiedad para comprobar si se cumple la expresion regular, devuelve un array con las coincidencias
    console.log(str.match(regex1));
  };

  window.addEventListener("load", init);
}
