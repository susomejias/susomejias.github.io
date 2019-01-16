/**
 * Demo 1, parte 7
 * @author Jesús Mejías Leiva
 */
{
  //creo el plugin cuentaCaracteres
  jQuery.fn.cuentaCaracteres = function() {
    //para cada uno de los elementos del objeto jQuery
    this.each(function() {
      //creo una variable elem con el elemento actual, suponemos un textarea
      elem = $(this);
      //creo un elemento DIV sobre la marcha
      let contador = $(
        "<div>Contador caracteres: " + elem.val().length + "</div>"
      );
      //inserto el DIV después del elemento textarea
      elem.after(contador);
      //guardo una referencia al elemento DIV en los datos del objeto jQuery
      elem.data("campocontador", contador);
      //creo un evento keyup para este elemento actual
      elem.keyup(function() {
        //creo una variable elem con el elemento actual, suponemos un textarea
        var elem = $(this);
        //recupero el objeto que tiene el elemento DIV contador asociado al textarea
        var campocontador = elem.data("campocontador");
        //modifico el texto del contador, para actualizarlo con el número de caracteres escritos
        campocontador.text("Contador caracteres: " + elem.val().length);
      });
    });
    //siempre tengo que devolver this
    return this;
  };

  let init = function() {
    $("textarea").cuentaCaracteres();
  };

  $(init);
}
