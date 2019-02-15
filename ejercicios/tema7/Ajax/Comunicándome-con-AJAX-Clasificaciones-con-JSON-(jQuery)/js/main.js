/*
Para ello implementa una página con tres botontones donde descargues y muestres, según el botón:

Habilidades para la vida y una breve descripción.

Perfiles IT más demandados y una breve descripción.

Tipos de desarrolladores web y una lista de habilidades.

@author Jesús Mejías Leiva
*/
{

  let init = function(){

      $("#selectJson").change(function(event) {
        if ($(this).val() !== ""){
            showJSON("./JSON/" + $(this).val());
        }
      });



  }

  let showJSON = function(url){
     $.getJSON(url,function(data) {
       let html = ``;
       $.each(data, function(index,value) {

          if(value.skill && value.description){
              html+= `<p><b>${value.skill}</b>: ${value.description}</p>`
          }else if (value.profile && value.description){
            html+= `<p><b>${value.profile}</b>: ${value.description}</p>`
          }else if (value.type && value.skills){
            html+= `<p><b>${value.type}</b>:</p>`;
            for (let skill of value.skills) {
              //console.log(skill);
              html+= `<p>${skill}</p>`
            }

          }

        });
       $("#showInfo").html(html)
    });

  }

  $(init);

}
