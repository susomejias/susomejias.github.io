/**
 * Demo 4, parte 6
 * @author Jesús Mejías Leiva
 */
{
  let init = function() {
    $("#mitexto").keypress(e => {
      e.preventDefault();
      $("#loescrito").html(e.which + ": " + String.fromCharCode(e.which));
    });
  }
  $(init);
}
