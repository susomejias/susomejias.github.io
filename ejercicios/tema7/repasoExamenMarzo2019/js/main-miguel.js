/**
 * Examen final de Febrero
 * 
 * @author Miguel Ángel Gavilán Merino
 */

{
    /** 
     * Efectos del h3 de bienvenida
    */
    let efectosH3Bienvenida = function () {
        $(".example h3").first().slideToggle("slow")
            .slideToggle("slow")
            .append(". Gavilán")
            .on("click", function () {
                $(this).slideToggle("slow")
                    .slideToggle("slow");
            });
    };

    /** 
     * Comportamiento del primer botón
    */
    let comportamientoPrimerBoton = function () {
        $(".domtree h3").slideToggle("slow")
            .slideToggle("slow");
    };

    /**
     * Comportamiento del segundo boton
     */
    let comportamientoSegundoBoton = function () {
        $("ul li").fadeOut("slow")
            .fadeIn("slow");
    };

    /**
     * Comportamiento del tercer botón
     */
    let comportamientoTercerBoton = function () {
        $("ul li ul li").slideToggle("slow")
            .slideToggle("slow");
    };

    /**
     * Comportamiento del cuarto botón
     */
    let comportamientoCuartoBoton = function () {
        let altura = $(".domtree p").first().height();
        let anchura = $(".domtree p").first().width();

        $(".domtree p").first().animate({
            width: 0
        }, 1000)
            .animate({
                height: altura,
                width: anchura
            }, 1000);
    };

    /**
     * Comportamiento del quinto botón
     */
    let comportamientoQuintoBoton = function () {
        $(':selected').css({ backgroundColor: "#0f0" });
    };

    /**
     * Comportamiento del sexto botón
     */
    let comportamientoSextoBoton = function () {
        $("code").addClass("highlight")
            .animate({
                marginLeft: 5
            });
    };

    /**
     * Comportamiento del ajax
     */
    let comportamientoAjax = function () {
        $.ajax({
            type: "GET",
            url: "js/main.js",
            dataType: "text",
            success: function (response) {
                $("#customInput").html(response);
            }
        });
    };

    $(function () {
        $("h1").html("Examen jQuery. Marzo de 2018. Miguel Ángel Gavilán Merino");
        efectosH3Bienvenida();
        $("#customInput").html("Miguel Ángel Gavilán Merino");

        $("#toggleCustom").on("click", comportamientoAjax);

        $(".content input")[0].addEventListener("click", comportamientoPrimerBoton);
        $(".content input")[1].addEventListener("click", comportamientoSegundoBoton);
        $(".content input")[2].addEventListener("click", comportamientoTercerBoton);
        $(".content input")[3].addEventListener("click", comportamientoCuartoBoton);
        $(".content input")[4].addEventListener("click", comportamientoQuintoBoton);
        $(".content input")[5].addEventListener("click", comportamientoSextoBoton);

        //Asignación del plugin
        $(".domtree>h3").first().plugin();
        $("#miId").first().plugin({
            colorFondo: "red",
            altura: 100,
            tamFuente: 6
        });
    });

    /**
     * Plugin
     */
    $.fn.plugin = function (opciones) {
        let elemento = $(this);

        let colorFondo;
        let altura;
        let tamFuente;

        if (opciones === undefined) {
            colorFondo = "yellow";
            altura = elemento.height() * 40 / 100;
            tamFuente = elemento.css("fontSize") * 5;
        } else {
            colorFondo = opciones.colorFondo;
            altura = elemento.height() * opciones.altura / 100;
            tamFuente = elemento.css("fontSize") * opciones.tamFuente;
        }

        elemento.css("backgroundColor", colorFondo);
        elemento.css("height", altura);
        elemento.css("fontSize", tamFuente);

        $(this).on("click", function () {
            elemento.css("height", "1000px");
            elemento.css("fontSize", "200px");
        });

        $(this).on("dblclick", function () {
            elemento.css("height", altura);
            elemento.css("fontSize", "18px");
        });

        return this;
    }
}