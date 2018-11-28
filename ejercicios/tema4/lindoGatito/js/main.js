{
  let btnCrearGato;
  function init() {
    btnCrearGato = document.getElementById("btnCrearGato");

    btnCrearGato.addEventListener("click", crearGato);
  }

  let crearGato = function() {
    let ventana = window.open(
      "./accionesGato.html",
      "_self",
      ""
    );
  };

  window.addEventListener("load", init);
}
