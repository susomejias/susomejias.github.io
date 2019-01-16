/**
 * Demo 2, parte 6
 * @author Jesús Mejías Leiva
 */
{
  let init = function() {
    $(document).click(e => {
      $("#msg").text("X: " + e.pageX + " - Y: " + e.pageY);
    });
  }
  $(init);
}
