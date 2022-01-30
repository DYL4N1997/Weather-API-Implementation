// City weather search and output section variables
var weatherFormEl = $("#weatherform");
var searchBtn = $("search");
var cityOutput = $("cityoutput");
// Weather API key
var API_Key = "4b542e0983727542e6d0ae70fafd5319";

function getCityByName(name) {
    // api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4b542e0983727542e6d0ae70fafd5319
    return fetch(
        "api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + API_Key
    ).then(function (res) {
        return res.json();
    });
}

function handleNoCityFound(title) {
    var div = $(
      '<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>'
    );
    var strong = $(
      "<strong>We didn't find any citys with this name" + title + "</strong>"
    );
    var button = $(
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
    );
  
}





// Output to cards
// var dayCardsEl = 
 
// var London = 
// var Brighton =
// var Birmingham = 
// var Manchester = 
// var Plymouth = 


