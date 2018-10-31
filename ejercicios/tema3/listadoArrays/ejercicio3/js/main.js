/**
 * Indica la función que comprueba si un objeto es o no un Array. Demuestra su uso mediante un ejemplo.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    let pepe = {
      hola: "hello"
    };

    let array = [1, 2];

    console.log(Array.isArray(pepe));
    console.log(Array.isArray(array));
  }
  window.addEventListener("load", init);
}
