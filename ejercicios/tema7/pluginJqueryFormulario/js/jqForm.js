(function ( $ ) {

    $.fn.validar = function( options, classs ) {

        // patrones por defecto
        let patternsDefault = {
            nombre: /([a-zA-Z]{1,}\s?){1,3}/,
            apellidos: /([a-zA-Z]{1,}\s?){1,3}/,
            correo: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            textarea: /[a-zA-Z]{10,}/
        }
        // opciones por defecto
        let settings = $.extend({
            // por defecto.

            css: {
              color: "#fff",
              backgroundcolor: "rgba(244, 67, 54, .5)"
            },

            patternsObj: patternsDefault,


        }, options );


        // valida inputs y textarea que no sean tipo submit, cuando existan.

          let $inputs = $(":input:not([type='submit'])", $(this));

          if ($inputs.length > 0){

            $(this).submit(function(ev) {
              ev.preventDefault();
              $inputs.trigger("blur");
                let data = $(this).serializeArray();
                $.ajax({
                    type:'post',
                    url: './data.php',
                    data: data,
                    success: function(d){
                      let html = ``;
                      $.each(d, function(index, value) {
                        if (index !== "" && value !== ""){
                          html += `<p><b>${index.toUpperCase()}</b>:</br> ${value}</p><br/>`;
                          $("#mostrarDatos").html(html);
                        }

                      });
                    }
                });

            });
            // cuando se haga focus
            $inputs.blur(function(){
              let regexIndex = $(this).attr("tipo");
              //console.log(settings.patternsObj[regexIndex].test($(this).val()));
              if (!settings.patternsObj[regexIndex].test($(this).val())){
                $(this).css({
                  color: settings.css.color,
                  background: settings.css.backgroundcolor
                });
              }else{
                $(this).css({
                  color: "",
                  background: ""
                });
                $(this).addClass(classs);
              }
            });

            $inputs.focus(function(){
              $(this).css({
                color: "",
                background: ""
              });

              $(this).addClass(classs);
            });
          }
    };

}( jQuery ));
