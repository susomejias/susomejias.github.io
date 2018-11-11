/**
Entrega un código (debidamente comentado) donde demuestres los apartados del ejercicio anterior sobre la collection Set. Para ello utiliza como elementos los nombres y apellidos de cinco compañeros de clase.

@author Jesús Mejias Leiva
 */
{
  function init() {
    exercise10();
  }

  let exercise10 = function() {
    let b = new WeakSet([{}, {}]);
    let o = {};
    let a = new WeakSet([o, o]);

    // No puedes saber el tamaño de un WeakSet ya que su contenido son referencias de memoria, de manera que interviene el garbage collector "Recolector de basura"
  };

  window.addEventListener("load", init);
}
