/**
 * Crea  una función que cree un array de la dimensión indicada, cuyo contenido sean los números naturales comenzando desde 0
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    createArray(5);
  }

  let createArray = function(size) {
    let array = new Array(size);

    for (let i = 0; i < size; i++) {
      array[i] = i;
      //console.log(i);
    }

    console.log(array);
  };

  window.addEventListener("load", init);
}
