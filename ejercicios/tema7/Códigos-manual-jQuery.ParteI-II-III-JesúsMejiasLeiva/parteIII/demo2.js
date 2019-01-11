/**
 * Demo 1, parte 3
 * @author Jesús Mejías Leiva
 */
function init() {
  $("#boton").click(function() {
    //selectores ancestor descendant
    $("p i").css("color", "#66F");
  });
  $("table.mitabla td").css("background-color", "#55ff00");
  //selectores parent > child
  $("p.parraforojo > b").css("color", "red");
  $(".mitd > *").css("border", "1px solid #ff9900");
  //selectores prev + next
  $("i + b").css("font-size", "40px");
  $(".elemlista + li").css("opacity", 0.2);
  //selectores prev ~ siblings
  $("#a2 ~ div.clase").css("font-size", "180%");
  $("#miparrafo ~ table").css("border", "3px dotted #dd6600");
}
$(init);
