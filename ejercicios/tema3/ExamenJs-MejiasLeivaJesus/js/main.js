/**
 * @author Jesús Mejías Leiva
 */
{
  function init() {
    let ejercicio1 = document.getElementById("cuenta");
    let ejercicio2 = document.getElementById("nombreApellidos");

    ejercicio1.addEventListener("click", function(ev) {
      ev.preventDefault;
      let ej1 = window.open("./ejecicio1.html", "_self");
    });

    ejercicio2.addEventListener("click", function(ev) {
      ev.preventDefault;

      let ej2 = window.open("./ejecicio2.html", "_self");
    });
  }
  window.addEventListener("load", init);
}
