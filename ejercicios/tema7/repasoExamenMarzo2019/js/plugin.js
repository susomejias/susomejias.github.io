(function($) {

  $.fn.plugin = function(options) {

    // Las opciones por defecto serán: el color de fondo,
    //la altura y el tamaño de la fuente, que serán
    //respectivamente amarillo,
    //40% y 5 veces su tamaño.

    let defaults = {

      "background" : "yellow",
      "height" : "40%",
      "fontSize" : "5rem"


    }

    let opts = $.extend(defaults,options);

    const alturaOriginal = $(this).css("height");
    const fontSizeOriginal = $(this).css("font-size");

    $(this).css("background", defaults.background);

    $(this).click(function(event) {
      $(this).css({
        "height" : defaults.height,
        "font-size" : defaults.fontSize
      })
    });

    $(this).dblclick(function(event) {
      $(this).css({
        "height" : alturaOriginal,
        "font-size" : fontSizeOriginal
      })
    });




  };

})(jQuery);
