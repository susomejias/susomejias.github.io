/**
 * Demo 2, parte 2
 * @author Jesús Mejías Leiva
 */
function init() {
  $("a.enlacealmacenar").click(function(evento) {
    evento.preventDefault();
    var valorAlmacenado = $(this).data("midato");
    var mensaje =
      "En el enlace <b>" +
      $(this).attr("id") +
      "</b> tiene el dato 'midato' como " +
      valorAlmacenado;
    var valorAlmacenado2 = $(this).data("miobjeto");
    mensaje +=
      "<br>Además, he leído un dato llamado 'miobjeto' con valor " +
      valorAlmacenado2;
    $("#mensaje").html(mensaje);
  });

  $("#guardar").click(function(evento) {
    evento.preventDefault();
    $("a").data("midato", "mivalor");
    $("#mensaje").html(
      'He guardado en todos los enlaces un dato llamado "midato" con el valor "mivalor"'
    );
  });

  $("#guardarenlace1").click(function(evento) {
    evento.preventDefault();
    $("#enlace1").data("midato", "otro valor");
    $("#mensaje").html(
      'He guardado en el enlace1 un dato llamado "midato" con el valor "otrovalor"'
    );
  });

  $("#guardarobjeto").click(function(evento) {
    evento.preventDefault();
    $("a").data("miobjeto", $("#capapruebas"));
    $("#mensaje").html(
      'He guardado todos los enlaces un dato llamado "miobjeto" con el valor unobjeto que es el objeto jquery de seleccionar la capa con id "capapruebas"'
    );
  });

  $("#operarobjetoenlace1").click(function(evento) {
    evento.preventDefault();
    $("#enlace1")
      .data("miobjeto")
      .html(
        "cambio el html del objeto que hay en el dato 'miobjeto' del 'enlace1'"
      );
  });

  $("#operarobjetoenlace2").click(function(evento) {
    evento.preventDefault();
    $("#mensaje").html(
      "Este es el HTML que hay en el objeto asociado a enlace2 en el dato'miobjeto': <br>" +
        $("#enlace2")
          .data("miobjeto")
          .html()
    );
  });
}
$(init);
