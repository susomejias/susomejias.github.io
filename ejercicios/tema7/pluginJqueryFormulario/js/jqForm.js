(function ( $ ) {

    $.fn.validar = function( styles, patterns, infAjax ) {

        // control de la librería toast
        try{
          toastr
        }catch(e){
          if (e instanceof ReferenceError) {
            throw new Error("La dependencia toastr no esta instalado, puede instalarlo desde aquí: https://github.com/CodeSeven/toastr")
          }
        }

        // patrones por defecto
        let patternsDefault = {
            nombre: [/([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,}\s?){1,3}/,"Mínimo un nombre."],
            apellidos: [/([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,}\s?){1,3}/, "Mínimo un apellido."],
            correo: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Formato correo no válido."],
            textarea: [/(\w\s?.?\s?){10,}/, "Mínimo 10 caractéres."]
        }

        let cssDefault = {
            color: "#fff",
            background: "rgba(244, 67, 54, .5)",
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

        let toastOptions = function(){
            toastr.options.preventDuplicates = true;
            toastr.options.closeButton = true;

            toastr.options.timeOut = 2250;
            toastr.options.extendedTimeOut = 3100;

            toastr.options.showEasing = 'swing';
            toastr.options.hideEasing = 'linear';
            toastr.options.closeEasing = 'linear';

            toastr.options.showMethod = 'slideDown';
            toastr.options.hideMethod = 'slideUp';
            toastr.options.closeMethod = 'slideUp';

            toastr.options.progressBar = true;
            toastr.options.newestOnTop = false;
      }

        // guarda los estilos por defecto de los elementos del formulario
        let saveDefaultStyles = function(inputs){
          inputs.each(function(index, element) {
            saveOrSetStyles("save", $(element))
          });
        };

        // valida inputs y textarea que no sean tipo submit, cuando existan.



          let $inputs = $("input[type='text']", $(this));
          toastOptions();

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

                if (infAjax.url === undefined ||infAjax.url === "" ){
                    toastr.error('Url usada para la petición ajax no válida, revisa los parámetros de invocación del plugin','Parámetros url incorrecto');
                  return;
                  //throw new Error("Url no válida.")
                }

                if (infAjax.element === undefined ||infAjax.element === "" ){
                    toastr.error('Elemento donde se mostrará la información ajax no válido, revisa los parámetros de invocación del plugin','Parámetros element incorrecto');
                  //throw new Error("Elemento no válido.")
                  return;
                }

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
                $(this).css(cssExtend);

                  toastr.warning(patternsExtend[regexIndex][1], 'Formato ' + regexIndex + ' no válido .')

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
