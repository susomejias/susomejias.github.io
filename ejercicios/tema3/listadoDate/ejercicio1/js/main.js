/**
 * ¿Cuántos constructores tiene el objeto predefinido Date()? Explícalos mediante ejemplos.
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    constructorsDate();
  }

  let constructorsDate = function() {
    // Devuelve una fecha actual
    let date1 = new Date();
    console.log("CONTRUCTOR VACÍO ->> " + date1);

    // Convierte los milisegundos a fecha partiendo de la fecha inicial del objeto date
    let date2 = new Date(255667930300958);
    console.log("CONTRUCTOR MILISEGUNDOS ->> " + date2);

    // Devuelve la fecha pasada por argumento como string
    let date3 = new Date("December 17, 1995 03:24:00");
    console.log("CONTRUCTOR STRING ->> " + date3);

    // Devuelve la fecha pasada por argumento, en este ejemplo vemos como también podemos pasar una hora, en este caso las 03:24:00
    let date4 = new Date(1995, 11, 17, 3, 24, 0);
    console.log("CONTRUCTOR FECHA Y HORA ->> " + date4);
  };

  window.addEventListener("load", init);
}
