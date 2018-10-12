/**

Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".

* Autor: Jesús Mejias Leiva
*/

{

    let mostrar;
    
    function init() { 

        let isPalindromo = function (cadena){

    
            mostrar = document.getElementById("mostrar");

            let cadenaSinEspacio = cadena.replace(/ /g, "")
            let cadenaDelRevesSinEspacios = "";
    
            for (let i = cadenaSinEspacio.length - 1; i >= 0; i--) {
                
    
                cadenaDelRevesSinEspacios += cadenaSinEspacio[i];
    
            }
    
            cadenaSinEspacio = cadenaSinEspacio.toLowerCase();
            cadenaDelRevesSinEspacios = cadenaDelRevesSinEspacios.toLowerCase();
    
            // console.log(cadenaSinEspacio);
            // console.log(cadenaDelRevesSinEspacios);
    
            if (cadenaSinEspacio === cadenaDelRevesSinEspacios) {
    
                mostrar.textContent =  "La cadena \"" + cadena + "\" es un palindromo";
    
            }else{
    
                mostrar.textContent = "La cadena \"" + cadena + "\" no es un palindromo";
            }
    
        }
    
        isPalindromo("La ruta nos aporto otro paso natural");
    

    }

    window.onload = init;

}