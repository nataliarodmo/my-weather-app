//Display date
function addCurrentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateNow.getDay()];
  let currentHour = dateNow.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = dateNow.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentTime = `${currentHour}:${currentMinutes}`;
  let sentence = `${day} ${currentTime}`;

  return sentence;
}
let currentDate = document.querySelector("#date");
let dateNow = new Date();
currentDate.innerHTML = addCurrentDate(dateNow);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col text-center">
            <div class="weather-forecast-day">${formatForecastDay(
              forecastDay.time
            )}</div>
            <img
                class="sunny_forecast"
                src=${forecastDay.condition.icon_url}
                alt="weather"
              />
            <div class="weather-forecast-temperature"> 
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temperature.maximum
              )}º</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temperature.minimum
              )}º </span>
            </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "cf0o37c8aaf1022e4beeb7d4de3tca0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#enterCity");
  let city = input.value;
  search(city);
}

function getForecast(city) {
  let apiKey = "cf0o37c8aaf1022e4beeb7d4de3tca0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showCurrentTemperature(response) {
  //Temperature
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  // City
  let cityResult = response.data.city;
  let countryResult = response.data.country;
  updateCitySearch.innerHTML = `${cityResult}, ${countryResult}`;
  //Icon
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute("src", response.data.condition.icon_url);
  currentIcon.setAttribute("alt", response.data.condition.icon);
  //Humidity
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.temperature.humidity;
  //Wind
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  //Condition
  let currentCondition = document.querySelector("#description");
  currentCondition.innerHTML = response.data.condition.description;
  celsiusTemperature = response.data.temperature.current;
  getForecast(response.data.city);
}

let formCitySearch = document.querySelector("#citySearch");
let updateCitySearch = document.querySelector("#city");
formCitySearch.addEventListener("submit", handleSubmit);

//Current Location
function clickCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cf0o37c8aaf1022e4beeb7d4de3tca0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let submitCurrentLocation = document.querySelector("#current-location");
submitCurrentLocation.addEventListener("click", clickCurrentLocation);
let celsiusTemperature = null;

search("Bogota");
