/**

Escribir el código de una función a la que se pasa como parámetro un número entero y devuelve como resultado una cadena de texto que indica si el número es par o impar. Mostrar por pantalla el resultado devuelto por la función.

Autor : Jesús Mejias Leiva

*/

{

    


    let mostrar = document.getElementById("mostrar");

    function init (){

        let isParImpar = function(numero){

            if ((numero % 2) === 0){
    
                mostrar.textContent = "Es numero es par";
    
            }else{
    
                mostrar.textContent = "Es numero es impar";
                
            }
    
        }
    
        isParImpar(3);

    }

    window.onload = init;

}