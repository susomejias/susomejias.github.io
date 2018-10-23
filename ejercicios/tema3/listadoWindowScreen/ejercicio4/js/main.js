/**

Mi URL. Crea una página que te muestre debidamente desglosada la url. (servidor, protocolo, ruta...)

@author Jesús Mejias Leiva
*/
{

    let server;
    let protocol;
    let route;

    function init(){

        server = document.getElementById("server");
        protocol = document.getElementById("protocol");
        route = document.getElementById("route");

        getInfo();


    }

    let getInfo = function(){

        let location = document.location;

        server.innerHTML = "<b> Server: </b>" + location.host;
        protocol.innerHTML = "<b> Protocol: </b>" + location.protocol;
        route.innerHTML = "<b> Route: </b>" + location.href;

    }

    window.addEventListener("load", init);

}