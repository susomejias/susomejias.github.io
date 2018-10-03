{

    

    function init () {

        let windowWith = window.innerWidth;
        let windowHeight = window.innerHeight;

        let arribaIzquierda = document.getElementById("arribaIzquierda");
        let arribaDerecha = document.getElementById("arribaDerecha");
        let abajoIzquierda = document.getElementById("abajoIzquierda");
        let abajoDerecha = document.getElementById("abajoDerecha");

        let h2Ai = document.querySelector(".arribaIzquierda h2");



        document.addEventListener("click", function(ev){

            console.log(windowWith);
            console.log(ev.screenX);
            // console.log(ev.screenY);


            if (ev.screenX < (windowWith/2) && ev.y <= (windowHeight/2) ) {

                arribaDerecha.className = "";
                abajoIzquierda.className = "";
                abajoDerecha.className = "";


                arribaIzquierda.className = "pulsacion";

            }else if (ev.screenX > (windowWith/2) && ev.y <= (windowHeight/2) ) {

                arribaIzquierda.className = "";
                abajoIzquierda.className = "";
                abajoDerecha.className = "";

                arribaDerecha.className = "pulsacion";


            }else if (ev.screenX < (windowWith/2) && ev.y > (windowHeight/2) ) {
                
                arribaIzquierda.className = "";
                arribaDerecha.className = "";
                abajoDerecha.className = "";

                abajoIzquierda.className = "pulsacion";



            }else if (ev.screenX > (windowWith/2) && ev.y > (windowHeight/2) ) {

                arribaIzquierda.className = "";
                arribaDerecha.className = "";
                abajoIzquierda.className = "";

                abajoDerecha.className = "pulsacion";

            }


            // ev.screenX;
            // ev.screenY;

        });

    }

    window.addEventListener("load", init);

}