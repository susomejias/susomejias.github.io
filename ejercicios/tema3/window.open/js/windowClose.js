{

    let btnWindowClose;

    function init(){


        btnWindowClose = document.getElementById("windowClose");

        btnWindowClose.addEventListener("click", windowClose);

    }
    
    let windowClose = function () {

        window.close();

    }

    window.addEventListener("load", init);

}