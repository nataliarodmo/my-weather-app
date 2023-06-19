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

function search(city) {
  let apiKey = "8ef06a31801fb0f16331001137970b0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#enterCity");
  let city = input.value;
  search(city);
}
function showCurrentTemperature(response) {
  //Temperature
  let currentTemperature = Math.round(response.data.main.temp);
  let updateCurrentTemperature = document.querySelector("#current-temperature");
  updateCurrentTemperature.innerHTML = currentTemperature;
  // City
  let cityResult = response.data.name;
  let countryResult = response.data.sys.country;
  updateCitySearch.innerHTML = `${cityResult}, ${countryResult}`;
  //Humidity
  let currentHumidity = response.data.main.humidity;
  currentHumidity = `Humidity: ${currentHumidity}%`;
  let updateCurrentHumidity = document.querySelector("#humidity");
  updateCurrentHumidity.innerHTML = currentHumidity;
  //Wind
  let currentWind = Math.round(response.data.wind.speed);
  currentWind = `Wind: ${currentWind} Km/h`;
  let updateCurrentWind = document.querySelector("#wind");
  updateCurrentWind.innerHTML = currentWind;
  console.log(response);
  //Condition
  let currentCondition = response.data.weather[0].main;
  let updateCurrentCondition = document.querySelector("#description");
  updateCurrentCondition.innerHTML = currentCondition;
}

let formCitySearch = document.querySelector("#citySearch");
let updateCitySearch = document.querySelector("#city");
formCitySearch.addEventListener("submit", handleSubmit);
search("Toronto");
// F and C
//function updateToCelsius(event) {
//event.preventDefault();
//let temperatureNumber = document.querySelector("#current-temperature");
//temperatureNumber.innerHTML = 19;}
//function updateToFahrenheit(event) {
//event.preventDefault();
//let temperatureNumber = document.querySelector("#current-temperature");
//temperatureNumber.innerHTML = 66;}
//let showCelsius = document.querySelector("#celsius-link");
//let showFahrenheit = document.querySelector("#fahrenheit-link");
//showCelsius.addEventListener("click", updateToCelsius);
//showFahrenheit.addEventListener("click", updateToFahrenheit);
//Current Location
function clickCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8ef06a31801fb0f16331001137970b0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let submitCurrentLocation = document.querySelector("#current-location");
submitCurrentLocation.addEventListener("click", clickCurrentLocation);
