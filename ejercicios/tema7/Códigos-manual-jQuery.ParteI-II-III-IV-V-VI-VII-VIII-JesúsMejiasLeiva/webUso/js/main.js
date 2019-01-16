{
  function init() {
    // muestra los valores de los checkbox
    checkedAccess();

    // desactiva dos checkbox
    $(":checkbox").click(disabledTwo.bind(this));

    // name del checkb
    eventOn();

    // los atributos pertencen al objeton event
    attributes();

    //.on(), .live(). bind() y .delegate(), están deprecated
  }

  let checkedAccess = function() {
    $("checkbox").prop("checked");
    $("checkbox").attr("checked");
    $(":checked").val();
    $("checkbox").val();
  };

  let disabledTwo = function(element) {
    $(":checkbox").each(function() {
      if ($(element.currentTarget).prop("name") === $(this).prop("name")) {
        $(this).prop("checked", true);
      } else {
        $(this).prop("checked", false);
      }
    });
  };

  let eventOn = function() {
    $(":checkbox").on("click", function() {
      $("#msg").text("Hola, soy el check con name: " + $(this).prop("name"));
    });
  };

  let attributes = function() {
    $(":checkbox").hover(ev => {
      $("#msg").text(
        "Hola, estoy en la posición: " + "x:" + ev.pageX + ", Y:" + ev.pageY
      );
    });
  };

  $(init);
}
