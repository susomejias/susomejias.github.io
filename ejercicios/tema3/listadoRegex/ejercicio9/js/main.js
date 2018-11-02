/**
 * Busca en el objeto String funciones que simulen la funcionalidad de test()
 * @author Jesús Mejias Leiva
 */
{
  function init() {
    stringTest();
  }

  let stringTest = function() {
    let regex1 = /coucou/g;

    let str = "coucou";

    // Propiedad para comprobar si se cumple la expresion regular, devuelve el índice de la primera coincidencia entre la expresión regular y la cadena de texto proporcionada, si no se encuentra devuelve -1.
    console.log(str.search(regex1));
  };

  window.addEventListener("load", init);
}
