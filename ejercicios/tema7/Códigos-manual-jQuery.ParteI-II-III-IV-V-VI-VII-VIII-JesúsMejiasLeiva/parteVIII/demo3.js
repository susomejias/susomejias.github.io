/**
 * Demo 3, parte 8
 * @author Jesús Mejías Leiva
 */
{
  let init = function() {
    $("#selopacidad").change(function(e) {
      var opacidad_deseada = e.target.options[e.target.selectedIndex].value;
      $("h1").fadeTo(1000, opacidad_deseada);
    });
  };
  $(init);
}
