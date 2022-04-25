const API_KEY = "4b542e0983727542e6d0ae70fafd5319";
const cityFormEl = document.querySelector("#weather-form");
const citySelectorEl = document.querySelector("#city-selector");
const searchBtn = document.querySelector('#submit');
const prevSearch = [];
const cityTitleEl = document.querySelector("#city-name");
const currentWeatherEl = document.querySelector("#current-weather");
const futureForecastEl = document.querySelector("#futureForecast");

const searchLocation = (event) => {
  event.preventDefault();
//   resetDisplay();

  const cityName = citySelectorEl.value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    getFutureWeather(cityName);
    savePrevSearches(cityName);
  } else {
    alert("You must enter a valid city");
  }
};

const getCurrentWeather = (cityName) => {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric" +
    "&appid=" +
    API_KEY;
  // fetching api data
  fetch(apiUrl)
    .then(function (res) {
      if (res.ok) {
        return res.json().then(function (data) {
          showCurrentWeather(data, cityName);
        });
      } else {
        alert("Error: You must enter a valid city");
      }
    })
    .catch(function (err) {
      alert("Error: ");
    });
};

const showCurrentWeather = (weatherData, citySearch) => {
    let currentDate = moment().format(", MMMM Do YYYY");
    cityTitleEl.textContent = citySearch + currentDate;

    // Syntax to map weather variables to objects
    let temp = weatherData.main.temp;
    let wind = weatherData.wind.speed;
    let humidity = weatherData.main.humidity;

    // create
    let tempEl = document.createElement("li");
    let windEl = document.createElement("li");
    let humidityEl = document.createElement("li");

    // ammend
    tempEl.textContent = "Temp: " + temp + " °C";
    windEl.textContent = "Wind: " + wind + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + " %";

    // append
    weatherDataList.appendChild(tempEl);
    weatherDataList.appendChild(windEl);
    weatherDataList.appendChild(humidityEl);

    latestUVIndex(weatherData.coord);
};

// Get UV Index
    latestUVIndex = (coord) => {
    let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coord.lat +
    "&lon=" +
    coord.lon +
    "&appid=" +
    apiKey;

    fetch(apiUrl).then(function (res) {
        return res.json().then(function (data) {
          displayUVIndex(data);
        });
      });
    }

displayUVIndex = (weatherData) => {
    let uv = weatherData.daily[0].uvi;

    // Create
    let uvIndexEl = document.createElement("li");
    let uvIndexBtn = document.createElement("button");

    // ammend
    uvIndexEl.textContent = "UV Index: ";
    uvIndexBtn.textContent = uv + " %";

    // append

    weatherDataList.appendChild(uvIndexEl);
    uvIndexBtn.appendChild(uvIndexBtn);
}


cityFormEl.addEventListener("submit", searchLocation);













// var dayCards = document.querySelector("#day-cards");
// var prevSearchBtn = document.querySelector("#previous-search");
// var clearyBtn = document.querySelector("#cleary");
// var cardReveal = document.querySelector(".card");
// var hideContent = document.querySelector("#hidden");
// var locBtn = new Object();
// var displayContainer = document.querySelector("#display-container");
// var todaysWeather = document.querySelector("todays-weather-container")




// searchBtn.addEventListener("click", getCoords);


// function getCoords (event) {
//     event.preventDefault();
//     var city = citySelectorEl.value.trim();
//     if (city) {
//         getCoords(city);
//         citySelectorEl.textContent = " ";
//         cityNameEl.textContent = " ";
//         weatherOutputEl.textContent = " ";
//         prevSearchBtn.textContent = " ";
//         dayCards.textContent = " ";
//     } else {
//         alert ("You must enter a city");
//     }
// }

// var getCoords = function (city) {
//     var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+city+',*,&limit=1&appid='+API_KEY;
//     fetch(apiUrl)
//     .then(function (res) {
//       if (res.ok) {
//         res.json().then(function (data) {
//           displayWeather(data);
//       });
//     }
//   })
// };

// console.log("Cities Searched");

// var displayWeather = function (possibleCities) {
//   if (possibleCities.length===0) {
//     var cityGroup=document.querySelector("#weather-output")
//     cityGroup.textContent = "Please choose a valid city";
//     return;
//   }
//   for (var i = 0; i < possibleCities.length; i++) {
//     var city = possibleCities[i].name + '  ' + possibleCities[i].country;
//     var cityCreate = document.createElement('ul');
//     var citi = document.createElement('button');
//     citi.classList = 'btn btn-success w-100 col-12 col-sm-12 col-md-12 col-lg-3'
//     citi.textContent = city;
//     citi.name = 'choice';
//     citi.id = 'choice' +i;
//     citi.value=i;
//     displayContainer.appendChild(cityCreate);
//     displayContainer.appendChild(citi);
//   }

// console.log ("Generated city buttons");

// }

// $("button[name='choice']").on('click',function() {
//   var j=parseInt($(this).val());

//   locBtn.citi=possibleCities[j].name;
//   locBtn.lat=possibleCities[j].lat;
//   locBtn.lon=possibleCities[j].lon;
  
//   myLocs.push({id:indexCities,locBtn});
//   indexCities++;
//   var index = myLocs.length- 1;
//   previousCities(myLocs);
//   getWeather(locBtn);}
//   );

// console.log ("LocBtn is saved")

// function getWeather (locBtn) {
//   var ocAPIURL = 'https//api.openweathermap.org/data/2.5/onecall?lat=' + locBtn.lat + '&lon=' + locBtn.lon + '&appid=' + API_KEY;
//   fetch(ocAPIURL)
//   .then(function (res) {
//     if (res.ok) {
//       res.json().then(function (data) {
//         todaysWeather(data);

//       });
//     } else {
//       res.ok=404 
//       alert('Unable to display weather for this city');
//     };
// });

// }




// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


// ocApi = 'https//api.openweathermap.org/data/2.5/onecall?lat=' + locBtn.lat + '&lon=' + locBtn.lon + '&appid=' + API_KEY;
