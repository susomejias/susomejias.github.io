/**

Definir una función que muestre información sobre una cadena de texto que se le pasa como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.

* Autor: Jesús Mejias Leiva 
*/

{

    let mostrar;

    function init () {

        let infoCadena = function (cadena) {

            mostrar = document.getElementById("mostrar");

            let sizeCadena = cadena.length;
            let mayusculas = "";
            let minusculas = "";
    
            for (var i = 0; i < cadena.length; i++) {
                
                if (cadena[i] === cadena[i].toUpperCase() ) {
    
                    mayusculas += cadena[i];
    
                }else if (cadena[i] === cadena[i].toLowerCase() ) {
    
                    minusculas += cadena[i];
    
                }
    
    
            }
    
            if (sizeCadena === mayusculas.length) {
    
                mostrar.textContent = "La cadena \"" + cadena + "\" está compuesta solo por letras mayuscula";
                
            }else if (sizeCadena === minusculas.length) {
    
                mostrar.textContent ="La cadena \"" + cadena + "\" está compuesta solo por letras minusculas";
    
            }else{
    
                mostrar.textContent = "La cadena \"" + cadena + "\" está compuesta por letras minusculas y mayusculas";
    
            }
    
        }
    
    
        // llamada funciones
        
        infoCadena("holA");

    }

    window.onload = init;

}
