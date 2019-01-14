/**
 * Demo 1, parte 4
 * @author Jesús Mejías Leiva
 */
function init() {
  let msg = "";
  $("a").each(i => {
    msg +=
      "<span>Atributo title del enlace " +
      (i + 1) +
      ": " +
      $(this).attr("title") +
      "</span><br/>";
    $("#msg").html(msg);
  });
}
$(init);
