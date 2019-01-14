/**
 * Demo 3, parte 4
 * @author Jesús Mejías Leiva
 */
function init() {
  let msg = `<span>$("input").prop("checked", true) : ${$("input").prop(
    "checked",
    true
  )}</span><br/><br/>
          <span>$("input").prop("checked"): ${$("input").prop(
            "checked"
          )}</span><br/><br/>`;

  $("#msg").html(msg);
}
$(init);
