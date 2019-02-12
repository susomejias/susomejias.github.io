{

let init = function(){

  $("#search").keyup(function(){
    let value = $(this).val() !== "" ? $(this).val() : "" ;

    if (value.length >= 0 ) {
        $.ajax({
            type: "GET",
            url: "./data.php",
            data: {
                'search' : value
            },
            dataType: "text",
            success: function(results){
              let resultsJson = results !== "" && results !== "No se encontraron resultados" ? JSON.parse(results) : {};
              if (!$.isEmptyObject(resultsJson)){
                $("#showSearch").html("")
                let html = ``;
                for (let i in resultsJson)
                {
                     html += `<p class="suggest ripple animated jackInTheBox delay-${i}s">${resultsJson[i].first_name} ${resultsJson[i].last_name}</p>`;
                }

                $("#showSearch").append(html);
                $(".suggest").click(function(){
                  $("#search").val($(this).text())
                });
              }else{
                $("#showSearch").html("No se encontraron resultados");
              }

            },
            complete: function(){
              $("#showSearch").css("background", "rgba(255,255,255,0.2)");
            }
        });
    }
  });


}


$(init)

}
