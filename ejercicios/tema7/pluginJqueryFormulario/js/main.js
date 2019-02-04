{

let init = function(){

  let patternsObj = {
    nombre: [/([a-zA-Z]{1,}\s?){1,3}/,"Probando extends."],
    apellidos: [/([a-zA-Z]{1,}\s?){1,3}/, "Probando extends."],
    correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Probando extends."],
    textarea: [/(\w\s?.?\s?){10,}/, "Probando extends."]
  };

  let infoAjax = {
    type: 'POST',
    url: './data.php',
    element: $('#mostrarDatos')
  };

  // sobreescribiendo los patrones
  $("form").validar(patternsObj,infoAjax);

  // usando solo la info de ajax
  //$("form").validar(infoAjax);

}

$(init)

}
