/**
 * Mediante un ejemplo real, indica la utilidad del método exec();
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    exec();
  }

  let exec = function() {
    let regex1 = /coucou/g;

    let str = "coucou";

    // Propiedad para comprobar si se cumple la expresion regular, devuelve un array con las coincidencias y los grupos si existieran
    console.log(regex1.exec(str));
  };

  window.addEventListener("load", init);
}
