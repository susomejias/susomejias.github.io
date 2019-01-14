/**
 * Demo 4, parte 6
 * @author Jesús Mejías Leiva
 */
function init() {
  $("#mitexto").keypress(e => {
    e.preventDefault();
    $("#loescrito").html(e.which + ": " + String.fromCharCode(e.which));
  });
}
$(init);
