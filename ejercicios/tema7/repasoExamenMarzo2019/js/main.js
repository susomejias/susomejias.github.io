{

let init = function(){
  ejercicio1();
  ejercicio2();
  ejercicio4();
}

let ejercicio1 = function(){
  //Al h3 de bienvenida:

  //a.i. Añádele el atributo “id”. Ponle tu primer apellido
  $(".example h3").prop("id", "mejias");
  //a.ii. Aplícale un efecto CUALQUIERA al cargarse la página. Al finalizar el efecto debe volver a su estado normal.
  $(".example h3").fadeIn('slow')
  //a.iii. Asocia el mismo efecto al realizar un clic sobre el mismo párrafo.
  $(".example h3").click(function(event) {
    $(this).fadeIn('slow')
  });
  //a.iv. Cambia nombre Apellido1 Apellid2 por el tuyo
  $(".section h1").text("Examen jQuery. Marzo de 2018. Jesús Mejías Leiva")

  //b. Añade tu nombre y dos apellidos a la texarea debajo del párrafo de bienvenida.
  $("form textarea").val("Jesús Mejías Leiva")

  //c. A los seis botones de la izquierda asóciale el comportamiento indicado.
  // nose que pide
  $(".example input").each(function(index, el) {
    switch($(el).val()){
      case "sube/baja":
            let sube = false;
            $(el).click(function(event) {
              $(".domtree h3").animate({ margin: '0px'}, 1000);
              sube = !sube
              if (sube){
                $(".domtree h3").animate({ marginBottom: '100px'}, 1000);
              }else{
                $(".domtree h3").animate({ marginTop: '100px' }, 1000);
              }

            });
          break;
      case "desaparece/aparece":
            $(el).click(function(event) {
              $(".domtree ul").toggle();
            });
          break;
      case "efectos":
          break;
      case "ancho/alto":
          break;
      case "verde":
            $(el).click(function(event) {
              console.log($("selected"));
              $("checkbox checked").css('color', 'green');
            });
          break;
      case "anima":
          break;
    }
  });
}

let ejercicio2 = function(){
  //Realiza una solicitud AJAX mediante jQuery.
  //Devolverá un texto al pulsar el botón AJAX y lo mostrará en el textArea correspondiente.
  $("#toggleCustom").click(function(event) {
    $.ajax({
      url: './texto.txt',
      type: 'GET',
    })
    .done(function(data) {
      $("#customInput").val(data)
    })
    .fail(function() {
      console.log("error");
    })
  });


}

let ejercicio4 = function(){
  //a. Al h3, con las opciones por defecto
  $(".example h3").plugin();

  //b. Al div con “id=miId”, con los siguientes valores: rojo, 100% y 6 veces su tamaño

}

$(init)

}
