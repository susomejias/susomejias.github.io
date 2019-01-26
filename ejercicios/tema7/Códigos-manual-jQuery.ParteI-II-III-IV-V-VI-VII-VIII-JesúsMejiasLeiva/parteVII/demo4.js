/**
 * Demo 1, parte 7
 * @author Jesús Mejías Leiva
 */
{
  jQuery.fn.checkboxPersonalizado = function(opciones) {
    //opciones de configuración por defecto
    let conf = {
      activo: true,
      colorTextos: {
        activo: "#00f",
        pasivo: "#669"
      },
      textos: {
        activo: "",
        pasivo: ""
      },
      imagen: {
        activo: "images/thumb_up.png",
        pasivo: "images/thumb_down.png"
      },
      cssElemento: {
        padding: "2px 2px 2px 24px",
        display: "block",
        margin: "2px",
        border: "1px solid #eee",
        cursor: "pointer"
      },
      cssAdicional: {},
      nameCheck: ""
    };
    //Las extiendo con las opciones recibidas al invocar el plugin
    jQuery.extend(conf, opciones);
    this.each(function() {
      //letiables locales al plugin
      let miCheck = $(this);
      let activo = conf.activo;
      //el elemento checkbox interno pero no visible
      let elementoCheck = $('<input type="checkbox" style="display: none;" />');
      //el nombre del checkbox puede ser configurado desde options o con el propio texto del campo
      if (conf.nameCheck == "") {
        elementoCheck.attr("name", miCheck.text());
      } else {
        elementoCheck.attr("name", conf.nameCheck);
      }
      //inserto el checkbox en la página
      miCheck.before(elementoCheck);
      //aplico estilos que vienen en la configuración
      miCheck.css(conf.cssElemento);
      miCheck.css(conf.cssAdicional);
      //si el elemento estaba marcado para estar activo
      if (activo) {
        //lo activo
        actilet();
      } else {
        //lo desactivo
        desactilet();
      }
      //defino un evento para el elemento
      miCheck.click(function(e) {
        //compruevo la letiable activo, definida dentro del plugin
        if (activo) {
          desactilet();
        } else {
          actilet();
        }
        activo = !activo;
      });
      //función local en el plugin para desactilet el checkbox
      function desactilet() {
        //cambio los estilos para el elemento a los marcados como pasivos
        miCheck.css({
          background:
            "transparent url(" + conf.imagen.pasivo + ") no-repeat 3px",
          color: conf.colorTextos.pasivo
        });
        //si hay un texto específico para cuando estaba pasivo
        if (conf.textos.pasivo != "") {
          miCheck.text(conf.textos.pasivo);
        }
        //desmarcho el checkbox interno que es invisible, pero que se envía como elemento de formulario.
        elementoCheck.removeAttr("checked");
      }
      function actilet() {
        miCheck.css({
          background:
            "transparent url(" + conf.imagen.activo + ") no-repeat 3px",
          color: conf.colorTextos.activo
        });
        if (conf.textos.activo != "") {
          miCheck.text(conf.textos.activo);
        }
        elementoCheck.attr("checked", "1");
      }
    });
    return this;
  };
  let init = function() {
    $(".ch").checkboxPersonalizado();
    $("#otro").checkboxPersonalizado({
      activo: false,
      colorTextos: {
        activo: "#f80",
        pasivo: "#98a"
      },
      imagen: {
        activo: "images/weather_cloudy.png",
        pasivo: "images/weather_rain.png"
      },
      textos: {
        activo: "Buen tiempo :)",
        pasivo: "Buena cara ;)"
      },
      cssAdicional: {
        border: "1px solid #dd5",
        width: "100px"
      },
      nameCheck: "buen_tiempo"
    });
  };

  $(init);
}
