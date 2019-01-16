/**
 * Demo 2, parte 4
 * @author Jesús Mejías Leiva
 */
{
  
  let init = function() {
    $("input.fecha").val(setFecha());
  }

  let setFecha = function() {
    let f = new Date();
    return f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
  };

  $(init);

}
