/**
Apariencia de las ventanas

Crea la siguiente página Web (lo más dinámica posible) donde el botón crea una nueva ventana ubicada en la esquina superior izquierda de la pantalla (top = 0, left = 0) y con los tamaños indicados.
Métodos a utilizar:
window.open()
document.write() 
Añade el esqueleto básico: html, head, title, body, ul...
@author Jesús Mejías Leiva
*/ 
{


    let btnWindowOpen;

    function init(){

        btnWindowOpen = document.getElementById("windowOpen");

        btnWindowOpen.addEventListener("click", windowOpenWriting);

    }


    let windowOpenWriting = function(){

        let windowA = window.open("","Apariencia ventana","top=0,left=0,height=200,width=300");

        let html = `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Ejercicio-JesúsMejiasLeiva</title>
                <link rel="stylesheet" href="css/estilos.css">
                <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
                <script type="text/javascript" src="js/windowClose.js"></script>
            </head>
            <body>
                <noscript>
                    Por favor, comprueba que tu navegador es compatible con javascript, o bien
                    comprueba si lo tienes activado
                </noscript>
                <p class="bold">Se han utilizado las propiedades:</p>
                <ul class="bold">
                    <li>height=${windowA.innerHeight}</li>
                    <li>width=${windowA.innerWidth}</li>
                </ul>
                <button class="btn" id="windowClose">Cerrar ventana</button>
            </body>
        </html>`;

        windowA.document.open();
        windowA.document.write(html);
        windowA.document.close();

    }

    window.addEventListener("load", init);

}