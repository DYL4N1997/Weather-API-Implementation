// City weather search and output section variables
var weatherFormEl = $("#weatherform");
var searchBtn = $("search");
var cityOutputEl = $("cityoutput");
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

// No city found handler
function handleNoCityFound(name) {
    var div = $(
      '<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>'
    );
    var strong = $(
      "<strong>We didn't find any citys with this name" + name + "</strong>"
    );
    var button = $(
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
    );
    
    div.append(strong);
    div.append(button);
}

// Rendering of city name on submit
function renderCityName(city) {
    var name = city.Name

    cityOutputEl.empty();

    var cityNameBox = $(
        '<div class="citynamebox" style="width: 100%; height: 35px; background-color: light-gray; color: black;>' + "<span>" + name + "</span>" + "</div>"
    );

    cityOutputEl.append(cityNameBox);

}



// Output to cards
// var dayCardsEl = 
 
// var London = 
// var Brighton =
// var Birmingham = 
// var Manchester = 
// var Plymouth = 


