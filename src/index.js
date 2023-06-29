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
function showCurrentTemperature(response) {
  console.log(response.data);
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
// Celcious to Farenhite
function updateToCelsius(event) {
  event.preventDefault();
  let temperatureNumber = document.querySelector("#current-temperature");
  // remove active class from F put to C
  showFahrenheit.classList.remove("active");
  showCelsius.classList.add("active");
  temperatureNumber.innerHTML = Math.round(celsiusTemperature);
}
function updateToFahrenheit(event) {
  event.preventDefault();
  let temperatureNumber = document.querySelector("#current-temperature");
  // remove active class from celcious put to F
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureNumber.innerHTML = Math.round(fahrenheitTemperature);
}
let showCelsius = document.querySelector("#celsius-link");
let showFahrenheit = document.querySelector("#fahrenheit-link");
showFahrenheit.addEventListener("click", updateToFahrenheit);
showCelsius.addEventListener("click", updateToCelsius);
let submitCurrentLocation = document.querySelector("#current-location");
submitCurrentLocation.addEventListener("click", clickCurrentLocation);
let celsiusTemperature = null;
search("Toronto");
