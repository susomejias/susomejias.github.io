/**
 * Demo 2, parte 2
 * @author Jesús Mejías Leiva
 */
function init(){
    $("#capa").data("nombre","Jesús Mejías Leiva");
    alert($("#capa").data("nombre"))

    // remover el dato
    $("#capa").removeData("nombre")

}
$(init)