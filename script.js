const APIKEY = '***REMOVED***';

function addCurrentWeather(json) {
  const weatherResults = document.getElementById("weatherResults");
  weatherResults.textContent = '';

  const inCity = weatherResults.appendChild(document.createElement("h2"));
  inCity.textContent = 'Weather in ' + json.name;

  const temp = weatherResults.appendChild(document.createElement("h3"));
  temp.innerHTML = json.main.temp + ' &deg;F';

  let results = '';
  for (let i = 0; i < json.weather.length; i++) {
    const image = weatherResults.appendChild(document.createElement("img"));
    image.setAttribute('src', 'http://openweathermap.org/img/w/' + json.weather[i].icon + '.png');

    results += json.weather[i].description
    if (i !== json.weather.length - 1) {
      results += ", ";
    }
  }

  const p = weatherResults.appendChild(document.createElement("p"));
  p.textContent = results;
}

function addForecast(json){
  const forecastResults = document.getElementById("forecastResults");
  forecastResults.textContent = '';

  const city = weatherResults.appendChild(document.createElement("h2"));
  city.textContent = '15-day Forecast';

  for (let i=0; i < json.list.length; i++) {
    const h2 = forecastResults.appendChild(document.createElement("h3"));
    h2.textContent = moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a');

    const p = forecastResults.appendChild(document.createElement("p"));
    p.textContent = "Temperature: " + json.list[i].main.temp;

    const img = forecastResults.appendChild(document.createElement("img"));
    img.setAttribute("src", 'http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png');
  }

}

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const city = document.getElementById("weatherInput").value;
    if (city === "")
      return;
    console.log(city);

    const currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial" + "&APPID=" + APIKEY;
    fetch(currentWeatherURL)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        addCurrentWeather(json);
      });

    const forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial" + "&APPID=" + APIKEY;
    fetch(forecastURL)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        addForecast(json);
      });

  });
});