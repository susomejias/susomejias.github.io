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

            let hours = ("0" + date.getHours()).slice(-2);
            let minutes = ("0" + date.getMinutes()).slice(-2);
            let seconds = ("0" + date.getSeconds()).slice(-2);

            clock.textContent = hours + ":" + minutes + ":" + seconds; 


        }, 1000);

    }

    window.addEventListener("load", init);

}