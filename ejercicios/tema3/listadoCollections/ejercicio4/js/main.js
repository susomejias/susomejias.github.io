/**
Entrega un código (debidamente comentado) donde demuestres los apartados del ejercicio anterior sobre la collection Map. Para ello utiliza como elementos los nombres y apellidos de cinco compañeros de clase.
@author Jesús Mejias Leiva
 */
{
  function init() {
    usageMap();
  }

  let usageMap = function() {
    //Constructor admite como parámetros:
    let array = [["nombre", "jesus"], ["apellido", "Mejias"]];
    let mapConstructor = new Map(array);

    console.log(mapConstructor);

    //Métodos para añadir:
    let mapAdd = new Map();

    mapAdd.set("nombre", "hola");
    mapAdd.set("object", { hola: "hellow" });

    console.log("Map set() -> " + mapAdd);

    //Métodos para eliminar:
    let mapDelete = new Map();

    mapDelete.set("nombre", "hola");
    mapDelete.delete("nombre");

    console.log("Map delete() -> " + mapDelete);

    //Métodos para buscar:
    let mapGet = new Map();

    mapGet.set("nombre", "hola");

    console.log("Map get() -> " + mapGet.get("nombre"));

    //Número de elementos:
    let mapSize = new Map();

    mapSize.set("nombre", "hola");

    console.log("Map size() -> " + mapSize.size);

    //Se recorren mediante:
    let mapForEach = new Map();

    mapForEach.set("nombre", "hola");

    mapForEach.forEach((element, key) => {
      console.log("Map forEach() -> " + element, key);
    });
  };

  window.addEventListener("load", init);
}
