/**
Crear un array llamado meses y que almacene el nombre de los doce meses del año. Mostrar por
pantalla los doce nombres utilizando la función alert().

Autor: Jesús Mejias Leiva
*/

{

    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let cadenaMeses = "";

    for (let i = 0; i < meses.length; i++) {
    
        cadenaMeses += meses[i] + "\n";
    }

    alert(cadenaMeses);

}