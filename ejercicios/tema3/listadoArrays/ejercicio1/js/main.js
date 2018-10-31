/**
 * Indica los tres argumentos del método forEach a un array. Demuestra su uso mediante un ejemplo.
 * @author Jesús Mejías Leiva
 */ 
{


    function init(){

        argumentsForeach();

    }

    let argumentsForeach = function(){

        let numbers = [1,2];

        numbers.forEach((element, index, array) => {

            //mostrando argumentos del forEach
            console.log(element, index, array);
            
        });

    }

    window.addEventListener("load", init);

}