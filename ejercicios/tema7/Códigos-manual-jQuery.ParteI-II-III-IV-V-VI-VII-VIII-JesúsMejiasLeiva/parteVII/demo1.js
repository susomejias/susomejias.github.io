/**
 * Demo 1, parte 7
 * @author Jesús Mejías Leiva
 */
{
  //plugin parpadear
  jQuery.fn.parpadea = function() {
    this.each(function() {
      elem = $(this);
      elem.fadeOut(250, function() {
        $(this).fadeIn(250);
      });
    });
    return this;
  };

  let init = function() {
    $(".parpadear").parpadea();
    //añado evento clic para un botón. Al pulsar parpadearán los elementos de clase parpadear
    $("#botonparpadear").click(() => $(".parpadear").parpadea());
  };

  $(init);
}
