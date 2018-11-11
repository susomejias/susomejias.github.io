/**
Entrega un código (debidamente comentado) donde demuestres los apartados del ejercicio anterior sobre la collection Set. Para ello utiliza como elementos los nombres y apellidos de cinco compañeros de clase.
@author Jesús Mejias Leiva
 */
{
  function init() {
    usageSet();
  }

  let usageSet = function() {
    //Constructor admite como parámetros:
    let array = ["elemento1", "elemento2"];
    let setConstructor = new Set(array);

    console.log(setConstructor);

    //Métodos para añadir:
    let setAdd = new Set();

    setAdd.add("nombre");
    setAdd.add({ hola: "hellow" });

    console.log("Set add() -> " + setAdd);

    //Métodos para eliminar:
    let setDelete = new Set();

    setDelete.add("nombre", "hola");
    setDelete.delete("nombre");

    console.log("Set delete() -> " + setDelete);

    //Número de elementos:
    let setSize = new Set();

    setSize.add("elemento1");
    setSize.add("elemento2");
    setSize.add("elemento3");

    console.log("Set size() -> " + setSize.size);

    //Se recorren mediante:
    let setForEach = new Set();

    setForEach.add("nombre", "hola");

    setForEach.forEach(element => {
      console.log("Set forEach() -> " + element);
    });
  };

  window.addEventListener("load", init);
}
