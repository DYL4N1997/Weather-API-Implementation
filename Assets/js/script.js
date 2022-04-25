const API_KEY = "4b542e0983727542e6d0ae70fafd5319";
const cityFormEl = document.querySelector("#weather-form");
const citySelectorEl = document.querySelector("#city-selector");
const searchBtn = document.querySelector('#submit');
const prevSearch = [];
const cityTitleEl = document.querySelector("#city-name");
const weatherDataUl = document.querySelector("#weather-output");
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

    uvIndexBtn.classList.add("medium-risk");

    // append

    weatherDataUl.appendChild(uvIndexEl);
    uvIndexBtn.appendChild(uvIndexBtn);
}

getFutureWeather = (cityName) => {
    let apiUrl = 
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric" +
    "&appid=" +
    API_KEY;

    fetch(apiUrl).then(function (res) {
        return res.json().then(function(data) {
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




