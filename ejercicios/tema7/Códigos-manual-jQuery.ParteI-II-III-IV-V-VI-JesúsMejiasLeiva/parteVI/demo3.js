/**
 * Demo 3, parte 6
 * @author Jesús Mejías Leiva
 */
{
  let init = function() {
    $("#elemento1").mouseenter(function(e) {
      $("#tip1").css("left", e.pageX + 5);
      $("#tip1").css("top", e.pageY + 5);
      $("#tip1").css("display", "block");
    });
    $("#elemento1").mouseleave(function(e) {
      $("#tip1").css("display", "none");
    });
    $("#elemento2").mouseenter(function(e) {
      $("#tip2").css("left", e.pageX + 5);
      $("#tip2").css("top", e.pageY + 5);
      $("#tip2").css("display", "block");
    });
    $("#elemento2").mouseleave(function(e) {
      $("#tip2").css("display", "none");
    });
  }
  $(init);

}
