/**

El factorial de un número entero n es una operación matemática que consiste en multiplicar todos
los factores n x (n-1) x (n-2) x ... x 1. Así, el factorial de 5 (escrito como 5!) es igual a: 5! =
5 x 4 x 3 x 2 x 1 = 120
Utilizando la estructura for, crear un script que calcule el factorial de un número entero.

Autor: Jesús Mejias Leiva

*/

{


    let numero = prompt("Introduce un número para hacer su factorial");

    let factorial = numero;



    for (let i = numero-1; i > 0; i--) {
        
        
        factorial = factorial * i;  

        
    }

    console.log("El factorial de " + numero + " es: " + factorial);

}