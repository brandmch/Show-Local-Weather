import { useEffect, useState } from "react";
import "./App.css";
import { Box, Switch, Typography, Divider } from "@mui/material";

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
  } = weatherData;

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
    <Box>
      <Box display="flex">
        <Typography>F</Typography>
        <Switch value={CorF} onChange={(e) => setCorF(!CorF)} />
        <Typography>C</Typography>
      </Box>

      <Typography>
        {city}, {state}, {country}
      </Typography>
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
      <Divider />
      <Typography>Sunrise: {sunrise}</Typography>
      <Typography>Sunset: {sunset}</Typography>
    </Box>
  );
};

export default WeatherDataDisplay;
