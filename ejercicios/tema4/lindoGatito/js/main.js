{
  let btnCrearGato;
  function init() {
    btnCrearGato = document.getElementById("btnCrearGato");

    btnCrearGato.addEventListener("click", crearGato);
  }

  let crearGato = function() {
    let ventana = window.open(
      "./accionesGato.html",
      "",
      ""
    );
  };

  window.addEventListener("load", init);
}
