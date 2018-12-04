{

    let canvas;
    let arrayColores = ["#7E57C2", "#5C6BC0", "#42A5F5", "#EC407A" , "#66BB6A", "#FF7043", "#8D6E63", "#78909C", "#004D40", "#1B5E20", "#33691E", "#E65100", "#263238", "#3E2723", "#880E4F"];

    function init(){

        canvas = Array.from(document.getElementsByTagName("canvas"));

        
        canvas.forEach(element => { 
            element.addEventListener(element.getAttribute("id"), ev =>{
                let aleatorio = Math.floor(Math.random() * (arrayColores.length - 0)) + 0;
                pintaCanvas(element,aleatorio,ev.screenX,ev.screenY, ev.button, ev.buttons);
            });
            pintaCanvas(element);
        });

    }

    let pintaCanvas = function(canvas,aleatorio, x, y, button, buttons){
        
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d',{alpha:false});
            if (arguments.length === 1){
                ctx.fillStyle = "#3D5AFE";
            }else{
                
                ctx.fillStyle = arrayColores[aleatorio];
            }

            ctx.fillRect(0, 0, 400, 400);
            
            
            ctx.font = "bold 1.3rem Lato";
            ctx.fillStyle = "#fff";

            ctx.fillText(canvas.getAttribute("id"), 50, 30);

            if (arguments.length > 1){
                ctx.font = "bold 1.1rem Lato";
                ctx.fillText("x = " + x, 210, 40);
                ctx.fillText("y = " + y, 210, 70);
                ctx.fillText("button = " + button, 190, 100);
                ctx.fillText("buttons = " + buttons, 190, 130);
            }
            
        }
    }

    window.addEventListener("load", init);

}