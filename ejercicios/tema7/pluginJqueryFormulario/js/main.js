{

let init = function(){

  let patternsObj = {
    nombre: [/([a-zA-Z]{1,}\s?){1,3}/,"Probando nombre."],
    apellidos: [/([a-zA-Z]{1,}\s?){1,3}/, "Probando apellidos."],
    correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Probando correo."],
    textarea: [/(\w\s?.?\s?){10,}/, "Probando textarea."]
  };

  let infoAjax = {
    url: './autor.txt',
    element: $('#textAreaRespuesta')
  };


  // sobreescribiendo los patrones
  $("form").validar("",patternsObj,infoAjax);
  // usando solo la info de ajax
  //$("form").validar(infoAjax);

}


$(init)

}
