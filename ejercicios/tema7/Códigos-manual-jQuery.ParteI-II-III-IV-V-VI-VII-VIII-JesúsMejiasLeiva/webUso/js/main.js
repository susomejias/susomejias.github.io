{
  function init() {
    // muestra los valores de los checkbox
    checkedAccess();

    // desactiva dos checkbox
    $(":checkbox")
      .change(toogleDeshabilitar)
      .change();

    // name del checkb
    eventOn();

    // los atributos pertencen al objeton event
    attributes();

    //.on(), .live(). bind() y .delegate(), están deprecated
  }

  let checkedAccess = function() {
    console.log($("checkbox").prop("checked"));
    $("checkbox").attr("checked");
    $(":checked").val();
    $(":checkbox").val();
  };

  let toogleDeshabilitar = function() {
    if ($(this).prop("checked")) {
      $(":checkbox:not(:checked)").prop("disabled", true);
    } else {
      $(":checkbox:not(:checked)").prop("disabled", false);
    }
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
