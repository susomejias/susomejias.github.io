/**
 * Indica la utilidad del operador in con los arrays. Demuestra su uso mediante un ejemplo.
 * @author Jesús Mejías Leiva
 */
{


    function init(){


        let a = ["hola", "adios"];

        // comprobamos si existen los indices
        console.log(0 in a);

        // false ya que necesita el indice, no el valor
        console.log("hola" in a);

        // comprbando si existe propiedaes
        console.log("length" in a);

    }


    window.addEventListener("load", init);

}