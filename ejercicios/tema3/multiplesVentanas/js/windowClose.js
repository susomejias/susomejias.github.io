/** 
@author Jesús Mejias Leiva
*/
{

    function init(){

        let btnWindowClose = document.getElementById("windowClose");


        btnWindowClose.addEventListener("click", function(){

            window.close();

        });
        

    }


    window.addEventListener("load", init);

}