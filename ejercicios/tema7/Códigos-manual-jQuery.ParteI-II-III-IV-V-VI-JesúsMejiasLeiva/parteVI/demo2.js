/**
 * Demo 2, parte 6
 * @author Jesús Mejías Leiva
 */
function init() {
  $(document).click(e => {
    $("#msg").text("X: " + e.pageX + " - Y: " + e.pageY);
  });
}
$(init);
