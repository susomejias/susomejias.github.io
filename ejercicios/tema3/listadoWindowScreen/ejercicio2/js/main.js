/**

El objeto window dispone de las propiedades scrollX, scrollY y scrollbars. Muéstralos reaccionando al evento scroll sobre window.

@author Jesús Mejias Leiva

*/
{

    function init(){


        let scrollX = document.getElementById("scrollX");
        let scrollY = document.getElementById("scrollY");
        let scrollbars = document.getElementById("scrollbars");

        scrollX.innerHTML = "<b>ScrollX: </b>";
        scrollY.innerHTML = "<b>ScrollY: </b>";
        scrollbars.innerHTML = "<b>Scrollbars: </b>";

        window.addEventListener("scroll", function (){

            scrollX.innerHTML = "<b>ScrollX: </b>" + this.scrollX;
            scrollY.innerHTML = "<b>ScrollY: </b>" + this.scrollY;
            scrollbars.innerHTML = "<b>Scrollbars: </b>" + this.scrollbars.visible;

        });


    }

    window.addEventListener("load", init);

}