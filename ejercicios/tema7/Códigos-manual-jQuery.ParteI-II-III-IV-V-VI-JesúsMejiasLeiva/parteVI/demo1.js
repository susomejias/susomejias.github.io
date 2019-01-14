/**
 * Demo 1, parte 6
 * @author Jesús Mejías Leiva
 */
function init() {
  let numClics = 0;
  let numDobleClics = 0;

  $("#micapa").click(() => {
    numClics++;
    $("#mensaje").html("Clic " + numClics);
  });

  $("#micapa").dblclick(() => {
    numDobleClics++;
    $("#mensaje").html("Doble Clic " + numDobleClics);
  });
}
$(init);
