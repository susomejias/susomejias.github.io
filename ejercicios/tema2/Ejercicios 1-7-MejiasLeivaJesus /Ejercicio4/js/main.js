/**
A partir del siguiente array que se proporciona: var valores = [true, 5, false, "hola",
"adios", 2];
1. Determinar cual de los dos elementos de texto es mayor
2. Utilizando exclusivamente los dos valores booleanos del array, determinar los operadores
necesarios para obtener un resultado true y otro resultado false
3. Determinar el resultado de las cinco operaciones matemáticas realizadas con los dos
elementos numéricos

Autor: Jesús Mejias Leiva
*/

{


    // arrays para clasificar
    let strings = [];
    let booleans = [];
    let numbers = [];

    let clasificarValores = function () {

        valores = [true, 5, false, "hola","adios", 2];


        for (let i = 0; i < valores.length; i++) {
        
            //console.log(typeof(valores[i]));
    
            if(typeof(valores[i]) === 'string'){
    
                strings.push(valores[i]);
                
            }else if (typeof(valores[i]) === 'boolean'){
    
                booleans.push(valores[i]);
    
            }else if (typeof(valores[i]) === 'number'){
    
                numbers.push(valores[i]);
    
            }
    
        }

    }
    
    let comprobarCadenas = function () {

        console.log("*** Comprobar cadenas *** " + "(" + strings[0] + "," + strings[1] + ")");


        if (strings[0].length > strings[1].length) {
            console.log("La cadena " + strings[0] + " tiene una longitud mayor a la cadena " + strings[1]);
        }
        else if (strings[0].length < strings[1].length) {
            console.log("La cadena " + strings[0] + " tiene una longitud menor a la cadena " + strings[1]);
        }
        else {
            console.log("La cadena " + strings[0] + " es igual a la cadena " + strings[1]);
        }
    }
    

    let operadoresBooleanos = function () {


        console.log("*** Operadores booleanos *** " + "(" + booleans[0] + "," + booleans[1] + ")");
        console.log("Usando el operador === obtenemos " + (booleans[0] === booleans[1]));
        console.log("Usando el operador !== obtenemos " + (booleans[0] !== booleans[1]));

    }

    let operacionesMatematicas = function() {

        console.log("*** Operadores matemáticas *** " + "(" + numbers[0] + "," + numbers[1] + ")");

        console.log("El resultado de la suma de los dos valores es: " + (numbers[0] + numbers[1]));

        console.log("El resultado de la resta de los dos valores es: " + (numbers[0] - numbers[1]));

        console.log("El resultado de la multiplicación de los dos valores es: " + (numbers[0] * numbers[1]));

    }

    // llamada a funciones

    clasificarValores();

    comprobarCadenas();

    operadoresBooleanos();

    operacionesMatematicas();


}


