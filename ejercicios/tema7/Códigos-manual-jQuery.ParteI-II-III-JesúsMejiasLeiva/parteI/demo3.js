/**
 * Demo 3, parte 1
 * @author Jesús Mejías Leiva
 */

function init(){
    $("a").click(()=>alert("Has pulsado el enlace...nAhora serás enviado a DesarrolloWeb.com"));

    // para prevenir acción por defecto
    
    // $("a").click((ev)=>{
    //     alert("Has pulsado el enlace, pero vamos a cancelar el evento...nPor tanto, no vamos a llevarte a DesarrolloWeb.com")
    //     ev.preventDefault();
    // });
}

//código a ejecutar cuando el DOM está listo para recibir instrucciones. 
$(init)