(function ( $ ) {

    $.fn.validar = function( options, classs, infAjax ) {

        // patrones por defecto
        let patternsDefault = {
            nombre: [/([a-zA-Z]{1,}\s?){1,3}/,"Mínimo un nombre."],
            apellidos: [/([a-zA-Z]{1,}\s?){1,3}/, "Mínimo un apellido."],
            correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Formato correo no válido."],
            textarea: [/(\w\s?.?\s?){10,}/, "Mínimo 10 caractéres."]
        }
        // opciones por defecto
        let settings = $.extend({
            css: {
              color: "#fff",
              backgroundcolor: "rgba(244, 67, 54, .5)",
              border: "1px solid rgba(255,255,255,0.4)"
            },

            patternsObj: patternsDefault,


        }, options );


        let ajax = function(data){
          return new Promise(function(resolve,reject){
            $.ajax({
                type:'post',
                url: infAjax.url,
                data: data,
            })
            .done(resolve)
            .fail(reject);
          });

        }

        // valida inputs y textarea que no sean tipo submit, cuando existan.

          let $inputs = $(":input:not([type='submit'])", $(this));

          if ($inputs.length > 0){

            $(this).submit(function(ev) {
              ev.preventDefault();
              $inputs.trigger("blur");
              let data = $(this).serializeArray();
                 ajax(data).then(
                      function resolve(d){
                        let html = ``;
                        $.each(d, function(index, value) {
                          if (index !== "" && value !== ""){
                            html += `<p><b>${index.toUpperCase()}</b>:</br> ${value}</p><br/>`;
                            infAjax.element.html(html);
                          }
                        });
                      },
                      function reject(d){
                        console.error(d);
                      }
                );

            });
            // cuando se haga blur
            $inputs.blur(function(){
              let $input = $(this);
              let regexIndex = $(this).attr("tipo");
              //console.log(settings.patternsObj[regexIndex].test($(this).val()));
              if (!settings.patternsObj[regexIndex][0].test($(this).val())){
                $(this).css({
                  color: settings.css.color,
                  background: settings.css.backgroundcolor,
                  border: settings.css.border
                });
                if (toastr){
                  toastr.warning(settings.patternsObj[regexIndex][1], 'Formato ' + regexIndex + ' no válido .')

                }

              }else{
                $(this).css({
                  color: "",
                  background: "",
                  border: "0px"
                });
                $(this).addClass(classs);
              }
            });


            // cuando se haga focus
            $inputs.focus(function(){
              $(this).css({
                color: "",
                background: "",
                border: "0px"
              });

              $(this).addClass(classs);
            });

          }


    };


}( jQuery ));
