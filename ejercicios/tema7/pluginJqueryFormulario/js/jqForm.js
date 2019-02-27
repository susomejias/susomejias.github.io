(function ( $ ) {

    $.fn.validar = function( patterns, infAjax,styles) {

        // patrones por defecto
        let patternsDefault = {
            nombre: [/([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,}\s?){1,3}/,"Mínimo un nombre."],
            apellidos: [/([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,}\s?){1,3}/, "Mínimo un apellido."],
            correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Formato correo no válido."],
            textarea: [/(\w\s?.?\s?){10,}/, "Mínimo 10 caractéres."]
        }

        let cssDefault = {
            color: "#fff",
            backgroundcolor: "rgba(244, 67, 54, .5)",
            border: "1px solid rgba(255,255,255,0.4)"
        };


        // opciones por defecto
        let patternsExtend = $.extend(patternsDefault,patterns);

        let cssExtend = $.extend(cssDefault,styles);




        let stylesDefaultInput = {};
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
              for(let i = 0, l = style.length; i < l; i++){
                  let prop = style[i];
                  let camel = prop.replace(/\-([a-z])/g, camelize);
                  let val = style.getPropertyValue(prop);
                  returns[camel] = val;
              };
              return returns;
          };
          if(style = dom.currentStyle){
              for(let prop in style){
                  returns[prop] = style[prop];
              };
              return returns;
          };
          return element.css();
        };

        // guarda u obtiene los estilos de un elemento en el DOM
        let saveOrSetStyles = function(action, element){
          switch(element.prop("tagName").toUpperCase()){
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

          let $inputs = $("input[type='text']", $(this));

          saveDefaultStyles($inputs);

          let $inpErr = [];

          if ($inputs.length > 0){

            // cuando se haga submit
            $(this).submit(function(ev) {
              ev.preventDefault();
              $inpErr = [];
              $inputs.trigger("blur");
              // cuando no existan errores se realiza la petición ajax
              if ($inpErr.length === 0){

                fetch(infAjax.url)
                  .then(function(response) {
                    saveDefaultStyles($inputs);
                    return response.text();
                  })
                  .then(function(text) {
                    infAjax.element.val(text);
                    saveDefaultStyles($inputs);
                  });

              }else{
                  $inpErr[0].focus();
              }
            });

            // cuando se haga blur
            $inputs.blur(function(){

              let $input = $(this);


              if ($input.attr("tipo") === undefined){
                return;
              }

              let regexIndex = $input.attr("tipo");
              if (!patterns[regexIndex][0].test($input.val())){
                $(this).css({
                  color: cssExtend.color,
                  background: cssExtend.backgroundcolor,
                  border: cssExtend.border
                });

                if (toastr){
                  toastr.warning(patternsExtend[regexIndex][1], 'Formato ' + regexIndex + ' no válido .')
                }

                $("textarea").val("");
                $inpErr.push($input)

              }else{
                saveOrSetStyles("set", $(this));
              }

            });

            // cuando se haga focus
            $inputs.focus(function(){
              saveOrSetStyles("set", $(this));
            });

          }

          return this;
    };


}( jQuery ));
