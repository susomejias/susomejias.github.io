/**

Reloj. Crea una página que cada segundo te muestre actualizado un reloj digital del tipo "22:14:09 h" (usa timing events del objeto window)

@author Jesús Mejias Leiva

*/
{

    let clock;

    function init(){

        clock = document.getElementById("clock");

        updateTime();

    }

    let updateTime = function () {


        setInterval(() => {
            
            let date = new Date();

            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            clock.textContent = hours + ":" + minutes + ":" + seconds; 


        }, 1000);

    }

    window.addEventListener("load", init);

}