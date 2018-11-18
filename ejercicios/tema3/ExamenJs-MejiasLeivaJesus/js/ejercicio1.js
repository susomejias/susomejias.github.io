/**
 * @author Jesús Mejías Leiva
 */
{
  let mensaje;
  let btnReset;
  let btnRecargarPagina;
  let atras;
  function init() {
    mensaje = document.getElementById("mensaje");
    btnReset = document.getElementById("btnReset");
    btnRecargarPagina = document.getElementById("btnRecargarPagina");
    atras = document.getElementById("atras");

    funcionalidad();

    btnReset.addEventListener("click", resetContador);
    btnRecargarPagina.addEventListener("click", recargarPagina);

    atras.addEventListener("click", ev => {
      ev.preventDefault;
      history.back();
    });
  }

  let generaMensaje = function(contador) {
    if (contador !== null) {
      //console.log(typeof contador);

      if (contador === "1") {
        mensaje.textContent = `Bienvenido a mi humilde morada. Esta es la primera vez que entras. Espero que vuelvas`;
      } else if (contador === "2") {
        mensaje.textContent = `Hola de nuevo. Ya estas aquí por segunda vez. ¿Volveremos a vernos?. `;
      } else {
        mensaje.innerHTML = `Ya empiezas a ser pesado. Esta es la vez número 
        <b id="msgContador"> ${parseInt(contador)} 
        </b> que entras. Sigue con tus cosas.`;
      }
    }
  };

  let funcionalidad = function() {
    if (localStorage.getItem("contador") === null) {
      localStorage.setItem("contador", 0);
      generaMensaje(localStorage.getItem("contador"));
    } else {
      localStorage.setItem(
        "contador",
        parseInt(localStorage.getItem("contador")) + 1
      );
      generaMensaje(localStorage.getItem("contador"));
      //localStorage.clear();
    }

    console.log(localStorage.getItem("contador"));
  };

  let resetContador = function() {
    if (localStorage.getItem("contador") !== null) {
      localStorage.setItem("contador", 0);
      mensaje.innerHTML = `<b id="msgReset">Reseteado</b>`;
    }
  };

  let recargarPagina = function () {


    location.reload();

  }
  window.addEventListener("load", init);
}
