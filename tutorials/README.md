# Tutorials

To complete this lab, you will need to create an account at [Open Weather Map](http://openweathermap.org) and [follow the instructions to get an API key](http://openweathermap.org/appid).

Once you have an API key, you can call the API, using the JavaScript fetch() method. **You will need to supply your own API key in every place where these tutorials use APIKEY.**

We're going to do the following in this lab:

* learn how to use the [OpenWeatherMap API](https://openweathermap.org/api) to [fetch and display current weather conditions](/tutorials/current-weather-conditions.md)

* learn how to use the [OpenWeatherMap API](https://openweathermap.org/api) to [fetch and display the weather forecast](/tutorials/weather-forecast.md)

## If you are using HTTPS
If your production server is using HTTPS then you may only call APIs that also use HTTPS from your JavaScript. This ensures that all communication is encrypted and secure, not just part of it. The browser will give you an error if you attempt to mix your protocols. To compensate for this simply use the HTTPS endpoints for the weather service instead of the HTTP ones described in the tutorials.

:+1: `https://api.openweathermap.org`

:-1: `http://api.openweathermap.org`
