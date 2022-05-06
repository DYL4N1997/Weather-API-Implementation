let cityFormEl = document.querySelector("#weather-form");
let citySelectorEl = document.querySelector("#city-selector");
let searchBtn = document.querySelector('#submit');
let prevSearch = [];
let cityTitleEl = document.querySelector("#city-name");
let weatherDataUl = document.querySelector("#weather-output");
let currentWeatherEl = document.querySelector("#current-weather");
let futureForecastEl = document.querySelector("#futureForecast");

const API_KEY = "4b542e0983727542e6d0ae70fafd5319";

let searchLocation = (e) => {
  e.preventDefault();
  documentReset();

  let cityName = citySelectorEl.value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    getFutureWeather(cityName);
    savePrevSearches(cityName);
  } else {
    alert("You must enter a valid city");
  }
};

// Get rid of previous data
documentReset = () => {
    futureForecastEl.innerHTML = " ";
    $("#futureForecastH").text(" ");
    cityTitleEl.textContent = " ";
    weatherDataUl.innerHTML = " ";
}

let buttonSubmit = (event) => {
    documentReset();
    let cityButton = event.target.getAttribute("data-city");

    if (cityButton) {
        getCurrentWeather(cityButton);
        getFutureWeather(cityButton);
    }
};

$(document).on("click", ".city-button", buttonSubmit);

// Delete history button event listener
$("#btncleary").on("click", () => {
    localStorage.clear();
    removePreviousSearches();
    documentReset();
    location.reload();
});

// Function to remove previous searches
removePreviousSearches = () => {
    $(".city-button").remove();
}

savePrevSearches = (cityName) => {
    if (!prevSearch.includes(cityName)) {
      prevSearch.push(cityName);
      let cityInput = $(`
      <button data-city="${cityName}" class="btn btn-success w-100 my-1 city-button">${cityName}</button>`);
      $("#prevSearch").append(cityInput);
      localStorage.setItem("city", JSON.stringify(prevSearch));
    }
  }

let getCurrentWeather = (cityName) => {
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

let showCurrentWeather = (weatherData, citySearch) => {
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
    weatherDataUl.appendChild(tempEl);
    weatherDataUl.appendChild(windEl);
    weatherDataUl.appendChild(humidityEl);

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
    API_KEY;

    fetch(apiUrl).then((res) => {
        return res.json().then( (data) => {
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

    weatherDataUl.appendChild(uvIndexEl);
    weatherDataUl.appendChild(uvIndexBtn);
}

getFutureWeather = (cityName) => {
    let apiUrl = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric" +
    "&appid=" +
    API_KEY;

    fetch(apiUrl).then( (res) => {
        return res.json().then( (data) =>{
            displayFutureWeather(data.list);
        });
    });
}

displayFutureWeather = (futureWeatherData) => {
    let forecastHeader = $(
        `<h3 class="text-primary text-center text-uppercase mb-4" >5-Day Forecast<h3/>`
    );
    $("#futureForecastH").append(forecastHeader);

    for (let i = 1; i < futureWeatherData.length; i += 8) {
        let unixFormat = moment.unix(futureWeatherData[i].dt).format("MMMM Do YYYY");
        let futureCityData = {
            date: unixFormat,
            icon: futureWeatherData[i].weather[0].icon,
            maxTemp: futureWeatherData[i].main.temp_max,
            minTemp: futureWeatherData[i].main.temp_min,
            wind: futureWeatherData[i].wind.speed,
            humidity: futureWeatherData[i].main.humidity,
        };

        let futureContainer = $(`
        <div class="col-12 col-sm-12 col-lg-2 col-md-2 future-card-property">
            <h5>${futureCityData.date}</h5>
            <p>Max Temp:  ${futureCityData.maxTemp}  °C</p>
            <p>Min Temp: ${futureCityData.minTemp}  °C</p>
            <p>Wind: ${futureCityData.wind} MPH</p>
            <p>Humidity: ${futureCityData.humidity} %</p>
          <div>`);
    
        // append
        $("#futureForecast").append(futureContainer);
      }
}

cityFormEl.addEventListener("submit", searchLocation);

getLocalStorage();

// Create button elements from local storage data
function getLocalStorage() {
    if (localStorage.getItem("city")) {
      prevSearch = JSON.parse(localStorage.getItem("city"));
  
      for (var i = 0; i < prevSearch.length; i++) {
        var cityName = prevSearch[i];
        var cityInput = $(`
      <button data-city="${cityName}" class="btn btn-success w-100 my-1 city-button">${cityName}</button>`);
        $("#prevSearch").append(cityInput);
      }
      // Display the last searched city on screen
      getCurrentWeather(prevSearch[prevSearch.length - 1]);
      getFutureWeather(prevSearch[prevSearch.length - 1]);
    }
}

