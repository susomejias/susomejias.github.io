/**
 * función que devuelva un array con cada uno de los argumentos. En caso de que alguno de sus argumentos sea un array, que introduzca sus elementos uno a uno.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    
    let array = [undefined, 1, undefined, 3];

    deleteUndefined(array);

  }

  let deleteUndefined = function(array) {

    array.forEach(element => {
      
      if (element === undefined){

        // eliminamos pasandole un índice, y que solo borre un elemento
        array.splice( array.indexOf(element), 1 );

      }

    });

    console.log(array);

  };

  window.addEventListener("load", init);
}
