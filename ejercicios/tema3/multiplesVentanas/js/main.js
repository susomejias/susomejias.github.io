/**
Múltiples ventanas

Crea la siguiente página Web donde el botón crea cinco nuevas ventanas ubicadas en la esquina tal y como se muestran.
Métodos a utilizar:
miVentana = window.open('','','width=200,height=200');
miVentana.document.open();
miVentana.document.write() 
Añade el esqueleto básico: html, head, title, body, ul...
miVentana.document.close();

@author Jesús Mejias Leiva
*/
{

    let btnWindowsOpen;

    function init (){

        btnWindowsOpen = document.getElementById("windowsOpen");

        btnWindowsOpen.addEventListener("click", windowsOpen);

    }

    let windowsOpen = function () { 

        let windowsArray = [];

        for (let i = 0; i < 5; i++) {
            
            let windowA = window.open("","","width=200,height=200");

            let html = `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Ejercicio-JesúsMejiasLeiva</title>
                <link rel="stylesheet" href="css/estilos.css">
                <script type="text/javascript" src="js/windowClose.js"></script>
            </head>
            <body>
                <noscript>
                    Por favor, comprueba que tu navegador es compatible con javascript, o bien
                    comprueba si lo tienes activado
                </noscript>
                <p>Ventana${i + 1}</p>
                <button class="btn" id="windowClose">Cerrar</button>
            </body>
            </html>`;

            windowA.document.open();
            windowA.document.write(html);
            windowA.document.close();

        }

    }

    window.addEventListener("load", init);

}