// City weather search and output section variables
var weatherFormEl = $("#weatherForm");
var searchBtn = $("search");
var cityOutputEl = $("#cityoutput");
var cityNameEl = $("#cityName");
// Weather API key
var API_KEY = "4b542e0983727542e6d0ae70fafd5319";


function getCityByName(name) {
    // https://api.openweathermap.org/data/2.5/weather?q=london&appid=4b542e0983727542e6d0ae70fafd5319
    return fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + API_KEY
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

    cityOutputEl.append(div);
}

// Rendering of city name on submit
function renderCityName(city) {
    var name = city.Name;

    cityOutputEl.empty();

    var cityNameBox = $(
        '<div class="citynamebox" style="width: 100%; height: 35px; background-color: light-gray; color: black;">' + 
        "<h3 class=city-name><span>" + name + "</span></h3>" + "</div>"
    );

    cityOutputEl.append(cityNameBox);
    
    // Need to then store in local storage
}

weatherFormEl.on("submit", function (event) {
    event.preventDefault();

    var cityName = cityNameEl.val();

    getCityByName(cityName).then(function (data) {
        if (data.Error) {
            // No city found
            handleNoCityFound(cityName);
        }   else {
            // A city was found
            renderCityName(data);
        }
    });
});
    


// Output to cards
// var dayCardsEl = 
 
// var London = 
// var Brighton =
// var Birmingham = 
// var Manchester = 
// var Plymouth = 


