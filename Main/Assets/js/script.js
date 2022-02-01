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

// Rendering of city name on submit
function renderCityName(city) {
    var name = city.name;

    cityOutputEl.empty();

    var cityNameBox = $(
        "<button class=city-name><span>" + name + "</span></button>"
    );

    cityOutputEl.append(cityNameBox);
    
    // Need to then store in local storage
}

// // Gets from local storage store
// function getStoredCityEntries() {
//     var storedEntry = JSON.parse(localStorage.getItem('cityData'));
//     if (storedEntry) {
//         return storedEntry;
//     } else {
//         return [];
//     }
// }

// // Stores in local storage
// function saveCityToList(city) {
//     var store = getStoredCityEntries();
//     var inList = false;
//     store.forEach(element => {
//         if (element === city) {
//             inList = true;
//         }
//     });
//     if (!inList) {
//         store.push(city);
//     }
//     localStorage.setItem('cityData', JSON.stringify(store));
// }


weatherFormEl.on("submit", function (event) {
    event.preventDefault();

    var cityName = cityNameEl.val();

    getCityByName(cityName).then(function (data) {
        if (data.cod == 404) {
            // No city found
            alert("No city found for this name!");
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


