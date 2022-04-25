var API_KEY = "4b542e0983727542e6d0ae70fafd5319";

const mainCardEl = document.getElementById("mainCard")
// const forecastEl = 


function searchLocation(city){


   var location = document.querySelector("#city-selector").value;


    fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`

    )
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('api-data: ', data)



        //get my weather variables
        let city = data.name
        let temp = data.main.temp
        let feelsLike = Math.round(data.main.feels_like)


        //create html elements
        let card = document.createElement('div')
        let mainCardCity = document.createElement('H3')
        let mainCardTemp = document.createElement("p")
        let mainCardFeelsLike = document.createElement('p')

        //append card
        mainCardCity.textContent = city
        mainCardTemp.textContent = temp
        mainCardFeelsLike.textContent = feelsLike

        card.append(mainCardCity, mainCardTemp, mainCardFeelsLike)

        //append the card to our html
        card.innerHTML = ''
        mainCardEl.append(card)



        //start forcaste /one call api
        lat = data.coord.lat
        lon = data.coord.lon

        dailyForcast(lat, lon)


    })
     .catch(function (error) {
        console.error(error)
    })


}



function dailyForcast(lat, lon){

    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`

    )
     .then(function (response) {
        return response.json()
    })
    .then(function (forecast) {
        console.log('daily: ', forecast)



        //create div container element
        let dailyCard = document.createElement('div')


        //append element to dom
        forecastEl.innerHTML = ''
        forecastEl.append(dailyCard)


        for(var i = 1; i < forecast.daily.length; i++){
            dailyCards(forecast.daily[i])
        }
        

    })

    .catch(function (error) {
        console.error(error)
    })


}


function dailyCards(banana){


    let temp = banana.temp.day
    let feelsLike = 



}



document.querySelector("#submit").addEventListener("click", searchLocation)