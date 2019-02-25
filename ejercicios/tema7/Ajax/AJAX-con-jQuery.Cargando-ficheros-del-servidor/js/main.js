/*

Página html con una caja de texto donde se indica una url que vas a descargar del servidor. Inicialmente aparecerá la propia página

Al pulsar el botón "mostrar" mostrará el fichero en un scroller

En un div debe mostrarse en todo momento el estado en el que se encuentra la petición AJAX, indicando tanto el valor numérico como su descripción ("No inicializada", "Abierta"... "Completada") (readyState)

También se mostrará el código y texto del estado de la respuesta del servidor en otro div (status y statusText)

Utiliza estilos y diseña la página de forma equilibrada.

En la misma ruta, deja un fichero index2.html para probar la carga de otros ficheros

@author Jesús Mejías Leiva

*/

{


  let init = function(){

    $("#btnShow").click(GetHtml);

  }

  let GetHtml = function(){

      let actions = "";

      $.ajax({
        method: "GET",
        url: $("#inpUrl").val(),
        beforeSend: ()=> actions += "<p>beforeSend</p>",
        complete: ()=> {
          actions += "<p>complete</p>";
          $("#showState").html(actions);
        },
        success: (data)=> {

            $("#showInfo").text(data);
            actions += "<p>success</p>";


        },
        error: ()=> {
          actions += "<p>error</p>";
          $("#showInfo").text("");
        }
      });

  }

  $(init)

}
