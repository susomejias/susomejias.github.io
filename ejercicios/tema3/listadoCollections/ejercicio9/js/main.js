/**
Entrega un código (debidamente comentado) donde demuestres los apartados del ejercicio anterior sobre la collection WeakSet.Para ello utiliza como elementos los nombres y apellidos de cinco compañeros de clase

@author Jesús Mejias Leiva
 */
{
  function init() {
    usageWeakSet();
  }

  let usageWeakSet = function() {
    //Constructor admite como parámetros:
    let obj1 = { nombre: "jesús" };
    let obj2 = { apellido: "mejias" };
    let weakSetConstructor = new WeakSet([obj1, obj2]);

    console.log(weakSetConstructor);

    //Métodos para añadir:
    let weakSetAdd = new WeakSet();
    let obj3 = { nombre: "obj5" };
    let obj4 = { nombre: "obj4" };
    weakSetAdd.add(obj3);
    weakSetAdd.add(obj4);

    console.log("Set add() -> " + weakSetAdd);

    //Métodos para eliminar:
    let setDelete = new WeakSet();
    let obj5 = { nombre: "obj5" };
    setDelete.add(obj5);
    setDelete.delete(obj5);

    console.log("Set delete() -> " + setDelete);

    //Número de elementos:
    // No se puede comprobar el tamaño porque son referencias de memoria y entra en juego el garbage collector "recolector de basura"

    //Se recorren mediante:
    let weakSetForEach = new WeakSet();
    let obj6 = { nombre: "obj6" };
    weakSetForEach.add(obj6);

    // no se puede recorrer una weakSet
  };

  window.addEventListener("load", init);
}
