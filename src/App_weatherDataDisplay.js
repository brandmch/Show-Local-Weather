import { useEffect, useState } from "react";
import "./App.css";
import { Box, Switch, Typography, Divider, Paper } from "@mui/material";

function toCelcius(temp) {
  return ((5 / 9) * (temp - 32)).toFixed(2);
}
function toFahrenheit(temp) {
  return (temp * (9 / 5) + 32).toFixed(1);
}

const WeatherDataDisplay = ({ weatherData, setWeatherData }) => {
  const [CorF, setCorF] = useState(true);
  const {
    city,
    state,
    country,
    temperature,
    sunrise,
    sunset,
    visibility,
    weather,
    wind,
    humidity,
    pressure,
  } = weatherData;

  console.log(weatherData.weather[0].icon);

  const sunriseStr = new Date(parseInt(`${sunrise}000`));
  const sunsetStr = new Date(parseInt(`${sunset}000`));
  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  useEffect(() => {
    const func = CorF ? toFahrenheit : toCelcius;

    if (weatherData) {
      setWeatherData({
        ...weatherData,
        temperature: {
          feels_like: func(temperature.feels_like),
          temp: func(temperature.temp),
          temp_max: func(temperature.temp_max),
          temp_min: func(temperature.temp_min),
        },
      });
    }
  }, [CorF]);
  return (
    <Paper>
      <Box display="flex">
        <Typography>F</Typography>
        <Switch value={CorF} onChange={(e) => setCorF(!CorF)} />
        <Typography>C</Typography>
      </Box>

      <img src={weatherIcon}></img>

      <Typography variant="h3">
        {city}, {state}, {country}
      </Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>
        Current Temperature: {temperature.temp} {CorF ? "°F" : "°C"}
      </Typography>
      <Typography>
        Feels Like: {temperature.feels_like} {CorF ? "°F" : "°C"}
      </Typography>
      <Typography>
        Today's High: {temperature.temp_max} {CorF ? "°F" : "°C"}
      </Typography>
      <Typography>
        Today's Low: {temperature.temp_min} {CorF ? "°F" : "°C"}
      </Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Sunrise: {sunriseStr.toISOString()}</Typography>
      <Typography>Sunset: {sunsetStr.toISOString()}</Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Visibility: {visibility} meters</Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Weather Mainly: {weather[0].main}</Typography>
      <Typography>Weather: {weather[0].description}</Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Wind: {wind.speed} m/s</Typography>
      <Typography>Wind direction: {wind.speed} degrees</Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Humidity: {humidity} %</Typography>
      <Divider sx={{ margin: 1 }} />
      <Typography>Pressure: {pressure} hPa</Typography>
    </Paper>
  );
};

export default WeatherDataDisplay;

// WEATHER ICON CODES https://openweathermap.org/weather-conditions
