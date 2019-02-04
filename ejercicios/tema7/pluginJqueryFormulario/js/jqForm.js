(function ( $ ) {

    $.fn.validar = function( options, classs, infAjax ) {

        // patrones por defecto
        let patternsDefault = {
            nombre: [/([a-zA-Z]{1,}\s?){1,3}/,"Mínimo un nombre."],
            apellidos: [/([a-zA-Z]{1,}\s?){1,3}/, "Mínimo un apellido."],
            correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Formato correo no válido."],
            textarea: [/(\w\s?.?\s?){10,}/, "Mínimo 10 caractéres."]
        }

        let stylesDefaultInput = {};
        let stylesDefaultTextarea = {};
        // opciones por defecto
        let settings = $.extend({
            patternsObj: patternsDefault,

            css: {
              color: "#fff",
              backgroundcolor: "rgba(244, 67, 54, .5)",
              border: "1px solid rgba(255,255,255,0.4)"
            },





        }, options );


        let ajax = function(data){
          return new Promise(function(resolve,reject){
            $.ajax({
                type: infAjax.type,
                url: infAjax.url,
                data: data,
            })
            .done(resolve)
            .fail(reject);
          });

        }

        // devuelve el css de un elemento del DOM
        let getStyleObject = function(element){
          var dom = element.get(0);
          var style;
          var returns = {};
          if(window.getComputedStyle){
              var camelize = function(a,b){
                  return b.toUpperCase();
              };
              style = window.getComputedStyle(dom, null);
              for(var i = 0, l = style.length; i < l; i++){
                  var prop = style[i];
                  var camel = prop.replace(/\-([a-z])/g, camelize);
                  var val = style.getPropertyValue(prop);
                  returns[camel] = val;
              };
              return returns;
          };
          if(style = dom.currentStyle){
              for(var prop in style){
                  returns[prop] = style[prop];
              };
              return returns;
          };
          return element.css();
        };

        // guarda u obtiene los estilos de un elemento en el DOM
        let saveOrSetStyles = function(action, element){
          switch(element.prop("tagName").toUpperCase()){
            case "TEXTAREA":
                if (action.toLocaleLowerCase() === "save"){
                  stylesDefaultTextarea = getStyleObject(element)
                }else{
                  element.css(stylesDefaultTextarea);
                }
              break;
            case "INPUT":
            if (action.toLocaleLowerCase() === "save"){
              stylesDefaultInput = getStyleObject(element)
            }else{
              element.css(stylesDefaultInput);
            }
              break;
          }
        };

        // guarda los estilos por defecto de los elementos del formulario
        let saveDefaultStyles = function(inputs){
          inputs.each(function(index, element) {
            saveOrSetStyles("save", $(element))
          });
        };

        // valida inputs y textarea que no sean tipo submit, cuando existan.

          let $inputs = $("input[type='text'], textarea", $(this));

          saveDefaultStyles($inputs);

          let $mapInpErr = new Map();

          if ($inputs.length > 0){

            // cuando se haga submit
            $(this).submit(function(ev) {
              ev.preventDefault();
              $inputs.trigger("blur");
              // cuando no existan errores se realiza la petición ajax
              if ($mapInpErr.size === 0){
                let data = $(this).serializeArray();
                   ajax(data).then(
                        function resolve(d){
                          infAjax.element.html(d)
                        },
                        function reject(d){
                          console.error(d);
                        }
                  );
              }else{
                  $inputFocus = $mapInpErr.values().next().value;
                  $inputFocus.focus();
              }
            });
            // cuando se haga blur
            $inputs.blur(function(){

              //stylesDefault = $(this).getStyleObject();

              let $input = $(this);
              let regexIndex = $input.attr("tipo");
              if (!settings.patternsObj[regexIndex][0].test($input.val())){
                $(this).css({
                  color: settings.css.color,
                  background: settings.css.backgroundcolor,
                  border: settings.css.border
                });
                if (toastr){
                  toastr.warning(settings.patternsObj[regexIndex][1], 'Formato ' + regexIndex + ' no válido .')
                }

                $mapInpErr.set(regexIndex,$input);

              }else{
                saveOrSetStyles("set", $(this));
                $mapInpErr.delete(regexIndex);
              }
            });

            // cuando se haga focus
            $inputs.focus(function(){
              saveOrSetStyles("set", $(this));
            });

          }
    };


}( jQuery ));
