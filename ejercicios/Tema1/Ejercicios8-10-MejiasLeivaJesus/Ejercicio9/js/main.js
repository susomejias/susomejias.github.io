/**

Definir una función que muestre información sobre una cadena de texto que se le pasa como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.

* Autor: Jesús Mejias Leiva 
*/

{

    let infoCadena = function (cadena) {


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

            return console.log("La cadena \"" + cadena + "\" está compuesta solo por letras mayuscula");
            
        }else if (sizeCadena === minusculas.length) {

            return console.log("La cadena \"" + cadena + "\" está compuesta solo por letras minusculas");

        }else{

            return console.log("La cadena \"" + cadena + "\" está compuesta por letras minusculas y mayusculas");

        }

    }


    // llamada funciones
    
    infoCadena("hola");

}
