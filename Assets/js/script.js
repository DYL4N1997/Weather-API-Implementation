var API_KEY = "4b542e0983727542e6d0ae70fafd5319";
var citySelectorEl = document.querySelector("#city-selector");
var cityNameEl = document.querySelector("#city-name");
var searchBtn = document.querySelector('#search');
var weatherOutputEl = document.querySelector("#weather-output");
var dayCards = document.querySelector("#day-cards");
var prevSearchBtn = document.querySelector("#previous-search");
var clearyBtn = document.querySelector("#cleary");
var cardReveal = document.querySelector(".card");
var hideContent = document.querySelector("#hidden");

searchBtn.addEventListener("click", getCityWeather);

function getCityWeather (event) {
    event.preventDefault();
    dayCards.setAttribute("border", "2px");
    var city = citySelectorEl.value;
    if (city) {
        getCityWeather(city);
        citySelectorEl.textContent = " ";
        cityNameEl.textContent = " ";
        weatherOutputEl.textContent = " ";
        dayCards.textContent = " ";
    } else {
        alert ("You must enter a city");
    }
}

var getCityWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+',*&limit=3&appid='+API_KEY;
    fetch(apiUrl)
    .then(function (res) {
      if (res.ok) {
        res.json().then(function (data) {
          displayWeather(data);
      });
    }
  })
};
//   cities.push(data);
//   saveSearch();
//   prevSearch(data);
// };

var displayWeather = function (cities) {
if (cities.length === 0) {
    weatherOutputEl.textContent = 'No weather stored!';
    return;
}
 
for (var i = 0; i < cities.length; i++) {
  var city = cities[i].name + '  ' + cities[i].country;
  var cityButton = document.createElement('button');
  cityButton.classList = 'btn btn-success mt-3';
  cityButton.setAttribute('data', city);
  cityButton.setAttribute('id', 'click');
  prevSearchBtn.appendChild(cityButton);
  cityButton.textContent = city;
}
}

  // make an api call on the saved 
  var prevSearchHandler = function (event) {
        var city = event.target.getAttribute("data")
        cityNameEl.value = " ";
        weatherOutputEl.textContent = " ";
        dayCards.textContent = " ";
        var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+',*&limit=3&appid='+API_KEY;
        fetch(apiUrl)
        .then(function (res) {
        if (res.ok) {
          res.json().then(function (data) {
            displayWeather(data, city);
          });
      }
    })
  };