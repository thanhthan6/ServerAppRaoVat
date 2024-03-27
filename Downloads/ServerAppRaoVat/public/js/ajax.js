$(document).ready(function(){

    var url = "http://localhost:3000";

    $("#btn_AddNewCity").click(function(){
        $.post(url + "/city/add", {Name:$("#cityName").val()}, function(data){
            console.log(data);
            if(data.kq==1){
                $("#cityName").val("");
                $.post(url + "/city", function(data2){
                    if(data2.kq==1){
                        
                        $("#city_List").html("");
                        data2.list.forEach(function(city){
                            $("#city_List").append(`
                            <li class="city" cityID="` + city._id  +  `">` + city.Name + `</li>
                            `);
                        });
                        
                    }
                });
            }
        });
    });

});