/**
    Añadir a la clase Array un método llamado sin() que permita filtrar los elementos del array original y obtenga un nuevo array con todos los valores diferentes al indicado:

    var array1 = [1, 2, 3, 4, 5];
    var filtrado = array1.sin(4);  // filtrado = [1, 2, 3, 5]

    @author Jesús Mejías Leiva
 */
{
  function init() {
    Array.prototype.sin = function(diferencial) {
      return this.filter(element => element !== diferencial);
    };

    let array = [1, 2, 3, 4, 5];

    console.log(array.sin(4));
  }

  window.addEventListener("load", init);
}
