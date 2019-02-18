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
        }else{
          $("#showInfo").html("")
        }
      });



  }

  let showJSON = function(url){
     $.getJSON(url,function(data) {

       let selectCode = `<select name="" id="selectCode" >`;
       let devType = ``;

       $.each(data, function(index,value) {

          if(value.skill && value.description){
            selectCode += `
                <option value="${value.description}">${value.skill}</option>
            `;
              //html+= `<p><b>${value.skill}</b>: ${value.description}</p>`
          }else if (value.profile && value.description){
            selectCode += `
                <option value="${value.description}">${value.profile}</option>
            `;
            //selectCode+= `<p><b>${value.profile}</b>: ${value.description}</p>`
          }else if (value.type && value.skills){

            devType += `
                    <div id="container">
                    <b class="ripple">${value.type}</b>
                    <div class="skills">
                    `;
            for (let skill of value.skills) {
              devType += `
                  <p>${skill}</p>
              `
            }

            devType += `</div>`;
          }

        });

        // skill life
        selectCode += `
              </select>
              <p id='show'></p>
        `;

        $("#showInfo").html(selectCode)

        $("#show").fadeIn("slow").html($("#selectCode").val());

        $("#selectCode").change(function(event) {
            $("#show").fadeIn("slow").html($(this).val());
        });


        // CHECKS DEVS

        if (devType !== ''){
          devType += `</div>`;
            $("#showInfo").html(devType);
            $(".skills").css("display", "none");
            $("#container b").click(function(event) {
                let parentElement = $(this).parent();
                let div = parentElement.children(".skills")
                div.toggle("slow");
            });
        }




    });

  }

  $(init);

}
