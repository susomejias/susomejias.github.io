/**

Mejorar el ejemplo anterior indicando en todo momento al usuario el número de caracteres que aún puede escribir. Además, se debe permitir pulsar las teclas Backspace, Supr. y las flechas horizontales cuando se haya llegado al máximo número de caracteres.

Autor: Jesús Mejias Leiva

*/

{

    let textArea;
    const MAX_CARACT = 5;
    let info;
    let charCod;

    function init (){

        textArea = document.getElementById("texto"); 
        info = document.getElementById("info");


        // textArea.onkeypress = controlCharacterLimit;
        // textArea.onkeyup = muestraInfo;

        textArea.addEventListener("keypress", controlCharacterLimit);
        textArea.addEventListener("keyup", muestraInfo);

    }


    let controlCharacterLimit = function (ev) {

        charCod = ev.key;
        console.log(charCod);

        // if (charCod === "ArrowUp" || charCod === "ArrowDown" || charCod === "ArrowRight" || charCod === "ArrowLeft" || charCod === "Backspace"){
        //     return true;
        // }else 
        if (textArea.value.length >= MAX_CARACT){
            ev.preventDefault();
            return false;
        }

        return true;
        

    }

    let muestraInfo = function () {

        if (textArea.value.length >= MAX_CARACT) {

            info.innerHTML = "<p>¡¡ El máximo de caractéres es " + MAX_CARACT  + " !!</p>";

        }else{

            info.textContent = "Te quedan " + (MAX_CARACT - textArea.value.length)  + " para llegar al limite";

        }

    }

    window.addEventListener("load", init);

}