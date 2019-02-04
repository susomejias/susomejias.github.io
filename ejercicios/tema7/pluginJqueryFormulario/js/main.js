{

let init = function(){


  $("form").validar({

  // añadiendo un objeto con las regexs y los mensajes que queremos mostrar.
    patternsObj: {
      nombre: [/([a-zA-Z]{1,}\s?){1,3}/,"Probando extends."],
      apellidos: [/([a-zA-Z]{1,}\s?){1,3}/, "Probando extends."],
      correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Probando extends."],
      textarea: [/(\w\s?.?\s?){10,}/, "Probando extends."]
    }
  },

  // pasamos un objeto con los parámetros para el uso de ajax.
  {
    type: 'POST',
    url: './data.php',
    element: $('#mostrarDatos') // elemento donde mostraremos los datos de ajax
  });
}

$(init)

}
