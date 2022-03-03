// City weather search and output section variables
var weatherFormEl = $("#weatherForm");
// var searchBtn = $("search");
var cityOutputEl = $("#cityoutput");
var cityNameEl = $("#cityName");
var dayCardsEl = $("#daycardSec");
var submitBtn = document.querySelector('#submit');
var cityNamePop = $("#city");
var tempEL = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var UVIndexEl = $("#UVIndex");
var daycardsEL = $(".daycards");
// Weather API key
var API_KEY = "4b542e0983727542e6d0ae70fafd5319";

// where the local storage goes
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// when user clicks search button run the getCityWeather function
submitBtn.addEventListener("click", getCityWeather);

function getCityWeather(event) {
    event.preventDefault();
    var search = cityNameEl.value;
    if (search) {
        getCityWeather(search);
        cityNamePop.textContent = '';
        dayCardsEl.textContent = '';
        cityNameEl.value = '';
      } else {
        alert('Please enter a valid city');
      }
    };

// Call to API to get city weather
var getCityWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY + '&units=metric';
    fetch(apiUrl)
      .then(function (res) {
        if (res.ok) {
          res.json().then(function (data) {
            displayWeather(data, city);
            hideThis.style.display = "block";
  
          });
        } else {
          alert('Error: ' + res.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to obtain weather forecast');
      });
    cities.push(city);
    storeSearch();
    previousSearch(city);
  };
  
  // sets the local storage
  function storeSearch() {
    localStorage.setItem("cities", JSON.stringify(cities));
  };
  
  // get local storage on a page refresh
  getStorage();
  
  function getStorage() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities === null) {
      return;
    }
    for (var i = 0; i < storedCities.length; i++) {
      var cityButton = document.createElement('button');
      cityButton.classList = 'city-name';
      cityButton.setAttribute('data', storedCities[i]);
      cityButton.setAttribute('id', 'click');
      cityButton.textContent = storedCities[i];
    }
    if (storedCities !== null) {
      cities = storedCities;
    }
  };














// function getCityWeather(name) {
//     // https://api.openweathermap.org/data/2.5/weather?q=london&appid=4b542e0983727542e6d0ae70fafd5319
//     return fetch(
//         "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + API_KEY + 
//     ).then(function (res) {
//         return res.json();
//     });
// }




// // Rendering of city name on submit
// function renderCityName(city) {
//     var name = city.name;

//     cityOutputEl.empty();

//     var cityNameBox = $(
//         "<button class=city-name><span>" + name + "</span></button>"
//     );

//     cityOutputEl.append(cityNameBox);
    
//     // Need to then store in local storage
// }

// // // Gets from local storage store
// // function getStoredCityEntries() {
// //     var storedEntry = JSON.parse(localStorage.getItem('cityData'));
// //     if (storedEntry) {
// //         return storedEntry;
// //     } else {
// //         return [];
// //     }
// // }

// // // Stores in local storage
// // function saveCityToList(city) {
// //     var store = getStoredCityEntries();
// //     var inList = false;
// //     store.forEach(element => {
// //         if (element === city) {
// //             inList = true;
// //         }
// //     });
// //     if (!inList) {
// //         store.push(city);
// //     }
// //     localStorage.setItem('cityData', JSON.stringify(store));
// // }


// weatherFormEl.on("submit", function (event) {
//     event.preventDefault();

//     var cityName = cityNameEl.val();

//     getCityByName(cityName).then(function (data) {
//         if (data.cod == 404) {
//             // No city found
//             alert("No city found for this name!");
//         }   else {
//             // A city was found
//             renderCityName(data);
//         }
//     });
// });
// debugger;



// Output to cards
// var dayCardsEl = 
 
// var London = 
// var Brighton =
// var Birmingham = 
// var Manchester = 
// var Plymouth = 


