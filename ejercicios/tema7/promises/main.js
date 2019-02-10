/*
* Demostración de uso de Promise en JS Vanilla. La demo tiene como objetivo obtener datos
* de una API de forma asincrona.

* @author Jesús Mejías Leiva
*/

{

let init = function(){

    // Espera que la promise envie la respuesta y la muestra por el then() cuando sea correcta
    // o por el catch() cuando sea incorrecta.
    apiRequest().then((resolve)=>{
          console.log(resolve.json());
        }).catch((error)=>{
          console.log(error);
        });

    // Asigno un texto a un elemento html mientra recibo los datos de la API.
    document.getElementById("show").textContent = "Mostrando h1";

}

let apiRequest = function(){
  // creamos una Promise con su objeto predefinido y sus parámetros resolve y reject.
  return new Promise((resolve, reject)=>{

    // utilizamos la variable para probar el resolve y reject, y poder capturarlos con then y catch.
    let isError = false;

    if (!isError){
      console.log("Realizando petición");
      setTimeout(function(){
        // realizamos la petición a la API con fetch.
        let data = fetch("https://randomuser.me/api/")
        // Resultado que se enviará cuando la Promise sea correcta.
        resolve(data);
      },3500);
    }else{
       // Resultado que se enviará cuando la Promise sea incorrecta.
       reject("Error, entrando en el catch.");
    }

  });
}

window.addEventListener("load", init);

}
