var API_KEY = "4b542e0983727542e6d0ae70fafd5319";
var citySelectorEl = document.querySelector("#city-selector");
var cityNameEl = document.querySelector("#city-name");
var searchBtn = document.querySelector('#submit');
var weatherOutputEl = document.querySelector("#weather-output");
var dayCards = document.querySelector("#day-cards");
var prevSearchBtn = document.querySelector("#previous-search");
var clearyBtn = document.querySelector("#cleary");
var cardReveal = document.querySelector(".card");
var hideContent = document.querySelector("#hidden");
var locBtn = new Object();

searchBtn.addEventListener("click", getCoords);


function getCoords (event) {
    event.preventDefault();
    var city = citySelectorEl.value.trim();
    if (city) {
        getCoords(city);
        citySelectorEl.textContent = " ";
        cityNameEl.textContent = " ";
        weatherOutputEl.textContent = " ";
        prevSearchBtn.textContent = " ";
        dayCards.textContent = " ";
    } else {
        alert ("You must enter a city");
    }
}

var getCoords = function (city) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+',*,&limit=1&appid='+API_KEY;
    fetch(apiUrl)
    .then(function (res) {
      if (res.ok) {
        res.json().then(function (data) {
          displayWeather(data);
      });
    }
  })
};

console.log("Cities Searched");

var displayWeather = function (possibleCities) {
  if (possibleCities.length===0) {
    var cityGroup=document.querySelector("#weather-output")
    cityGroup.textContent = "Please choose a valid city";
    return;
  }
  for (var i = 0; i < possibleCities.length; i++) {
    var city = possibleCities[i].name + '  ' + possibleCities[i].country;
    var citi = document.createElement('ul');
    citi.classList = 'btn btn-success w-100'
    citi.textContent = city;
    citi.name = 'choice';
    citi.id = 'choice' +i;
    citi.value=i;
    prevSearchBtn.appendChild(citi);
  }

console.log ("Generated city buttons");

}







