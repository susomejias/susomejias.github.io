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
      "width=420,height=230"
    );
  };

  window.addEventListener("load", init);
}
