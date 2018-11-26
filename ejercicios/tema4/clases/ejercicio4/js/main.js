/**
    Extender la clase String para que permita truncar una cadena de texto a un tamaño indicado como parámetro:

    var cadena = "hola mundo";

    cadena2 = cadena.truncar(6); // cadena2 = "hola m"

    Modificar la función anterior para que permita definir el texto que indica que la cadena se ha truncado:

    var cadena = "hola mundo";
    cadena2 = cadena.truncar(6, '...'); // cadena2 = "hol..."

    @author Jesús Mejías Leiva
 */
{
  function init() {
    String.prototype.truncar = function(tamanno) {
      let nuevoString = ""; // creamos un string vacío para devolverlo
      for (let i = 0; i < tamanno; i++) {
        nuevoString += this.charAt(i);
      }
      let numeroPuntos = this.length - tamanno; // calculamos el numero de puntos

      for (let j = 0; j < numeroPuntos; j++) {
        // recorremos para colocar puntos
        nuevoString += ".";
      }
      return nuevoString;
    };

    let nombre = "Jesus Mejias";
    console.log(nombre.truncar(5));
  }

  window.addEventListener("load", init);
}
