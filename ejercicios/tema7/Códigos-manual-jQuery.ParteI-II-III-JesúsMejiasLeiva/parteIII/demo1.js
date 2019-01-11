/**
 * Demo 1, parte 3
 * @author Jesús Mejías Leiva
 */
function init() {
  $("#boton").click(function() {
    let selectorEscrito = $("#camposelector").val();
    if (selectorEscrito == "") {
      alert("Escribe algo en el campo de texto");
    } else {
      elementosSeleccionados = $(selectorEscrito);
      elementosSeleccionados.fadeOut("slow", function() {
        elementosSeleccionados.fadeIn("slow");
      });
    }
  });
}
$(init);
