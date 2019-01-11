/**
 * Demo 2, parte 1
 * @author Jesús Mejías Leiva 
 */
function init(){
    $("#capa").mouseenter(()=>$("#mensaje").css("display", "block"));
    $("#capa").mouseleave(()=>$("#mensaje").css("display", "none"));
}

$(init)
