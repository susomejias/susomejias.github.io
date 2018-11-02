/**
 * Mediante un ejemplo real, indica la utilidad del método test();
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    test();
  }

  let test = function() {
    let regex1 = /coucou/g;

    let str = "coucou";

    // Propiedad para comprobar si se cumple la expresion regular, devuelve true o false
    if (regex1.test(str)) {
      console.log("Se cumple la expresión");
    }
  };

  window.addEventListener("load", init);
}
