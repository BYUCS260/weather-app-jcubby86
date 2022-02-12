const APIKEY = '***REMOVED***';

function addCurrentWeather(json) {
  const weatherResults = document.getElementById("weatherResults");
  weatherResults.textContent = '';

  weatherResults.appendChild(document.createElement("hr"));

  const inCity = weatherResults.appendChild(document.createElement("h2"));
  inCity.textContent = 'Weather in ' + json.name;

  const item = weatherResults.appendChild(document.createElement("div"));
  item.setAttribute("class", "item");

  const temp = item.appendChild(document.createElement("h4"));
  temp.innerHTML = "Temperature: " + json.main.temp + ' &deg;F';

  let results = '';
  for (let i = 0; i < json.weather.length; i++) {
    const image = item.appendChild(document.createElement("img"));
    image.setAttribute('src', 'http://openweathermap.org/img/w/' + json.weather[i].icon + '.png');

    results += json.weather[i].description
    if (i !== json.weather.length - 1) {
      results += ", ";
    }
  }

  const p = item.appendChild(document.createElement("p"));
  p.textContent = results;
}

function addForecast(json){
  const forecastResults = document.getElementById("forecastResults");
  forecastResults.textContent = '';

  const city = forecastResults.appendChild(document.createElement("h2"));
  city.textContent = '15-day Forecast';

  const section = forecastResults.appendChild(document.createElement("div"));
  section.setAttribute("class", "section");
  for (let i=0; i < json.list.length; i++) {
    const item = section.appendChild(document.createElement("div"));
    item.setAttribute("class", "item");

    const h2 = item.appendChild(document.createElement("h3"));
    h2.textContent = moment(json.list[i].dt_txt).format('ddd, MMM D, h:mma');

    const p = item.appendChild(document.createElement("h5"));
    p.innerHTML = json.list[i].main.temp + ' &deg;F';

    const img = item.appendChild(document.createElement("img"));
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