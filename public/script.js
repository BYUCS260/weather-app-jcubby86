const APIKEY = 'bad';

function addCurrentWeather(json) {
  const weatherResults = document.getElementById("weatherResults");
  weatherResults.textContent = '';

  weatherResults.appendChild(document.createElement("hr"));
  weatherResults.appendChild(document.createElement("h2")).textContent = 'Weather in ' + json.name;

  const item = weatherResults.appendChild(document.createElement("div"));
  item.setAttribute("class", "item");

  item.appendChild(document.createElement("h4")).innerHTML = "Temperature: " + Math.round(json.main.temp) + ' &deg;F';
  item.appendChild(document.createElement("h4")).innerHTML = "Feels like: " + Math.round(json.main.feels_like) + ' &deg;F';
  item.appendChild(document.createElement("h4")).innerHTML = "H:" + Math.round(json.main.temp_max) + '&deg; L:' + Math.round(json.main.temp_min) + '&deg;';
  item.appendChild(document.createElement("h4")).innerHTML = "Humidity: " + json.main.humidity + "%";
  item.appendChild(document.createElement("h4")).innerHTML = "Sunrise: " + moment.unix(json.sys.sunrise).format('h:mma') + " - Sunset: " + moment.unix(json.sys.sunset).format('h:mma');

  let results = '';
  for (let i = 0; i < json.weather.length; i++) {
    item.appendChild(document.createElement("img")).setAttribute('src', 'https://openweathermap.org/img/w/' + json.weather[i].icon + '.png');

    results += json.weather[i].main + ' - ' + json.weather[i].description
    if (i !== json.weather.length - 1) {
      results += ", ";
    }
  }

  item.appendChild(document.createElement("h6")).textContent = results;
}

function addForecast(json) {
  const forecastResults = document.getElementById("forecastResults");
  forecastResults.textContent = '';

  forecastResults.appendChild(document.createElement("h2")).textContent = '5-day Forecast';

  let curr;
  let section;
  for (let i = 0; i < json.list.length; i++) {
    const dateString = moment(json.list[i].dt_txt).format('dddd, MMMM Do');
    if (i === 0 || dateString !== curr) {
      curr = dateString;
      forecastResults.appendChild(document.createElement("h3")).textContent = curr;
      section = forecastResults.appendChild(document.createElement("div"));
      section.setAttribute("class", "section day");
    }

    const item = section.appendChild(document.createElement("div"));
    item.setAttribute("class", "item");

    item.appendChild(document.createElement("h3")).textContent = moment(json.list[i].dt_txt).format('h:mma');
    item.appendChild(document.createElement("h4")).innerHTML = "Temp: " + Math.round(json.list[i].main.temp) + ' &deg;F';
    item.appendChild(document.createElement("h4")).innerHTML = "Feels like: " + Math.round(json.list[i].main.feels_like) + ' &deg;F';
    item.appendChild(document.createElement("h4")).innerHTML = "Humidity: " + json.list[i].main.humidity + "%";
    item.appendChild(document.createElement("img")).setAttribute("src", 'https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png');

  }

}

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const city = document.getElementById("weatherInput").value;
    if (city === "")
      return;
    console.log(city);

    const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial" + "&APPID=" + APIKEY;
    fetch(currentWeatherURL)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        addCurrentWeather(json);
      });

    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial" + "&APPID=" + APIKEY;
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        addForecast(json);
      });

  });
});
