/**
 * Indica la diferencia entre los siguientes métodos, y demuestra su uso con algunos arrays:  Array.prototype.forEach(), Array.prototype.every(), Array.prototype.some() y Array.prototype.filter()
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    
    let array = [1, 2, 3, 4];

    methodsArray(array);

  }

  let methodsArray = function(array) {

    // El método forEach() ejecuta la función indicada una vez por cada elemento del array
    array.forEach(element => {
      console.log(element);
    });


    // El método every() devuelve un booleano, true si todos los elementos en el array pasan la condición implementada por la función dada y false si alguno no la cumple.
    console.log("every() => " + array.every(element => element > 1));

    // El método some() retorna un valor booleano, true si algún elemento del array cumple con la condición implementada por la función brindada, y false en caso de que ningún elemento cumpla con dicha condición.
    console.log("some() => " + array.some(element => element > 1));

    // El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

    console.log("filter() => " + array.filter(element => element > 1));





  };

  window.addEventListener("load", init);
}
