import { useEffect, useState } from "react";
import "./App.css";
import { Box, Switch, Typography, Divider, Paper } from "@mui/material";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ModeNightIcon from "@mui/icons-material/ModeNight";

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
    <Paper sx={{ margin: 3, padding: 3, width: "80vw", alignSelf: "center" }}>
      {/* Header */}
      <Box display="flex">
        <Typography variant="h3" flex={10}>
          {city}, {state}, {country}
        </Typography>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography>F</Typography>
          <Switch value={CorF} onChange={(e) => setCorF(!CorF)} />
          <Typography>C</Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" flex={5}>
          <img src={weatherIcon} style={{ width: 200, height: 200 }}></img>
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginBottom={1}
            >
              <Typography variant="h5">Now</Typography>
              <Typography variant="h4">
                {temperature.temp} {CorF ? "°F" : "°C"}
              </Typography>
            </Box>

            <Typography marginBottom={1}>
              Feels Like: {temperature.feels_like} {CorF ? "°F" : "°C"}
            </Typography>
            <Box display="flex">
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">High</Typography>
                <Typography>
                  {temperature.temp_max} {CorF ? "°F" : "°C"}
                </Typography>
              </Box>
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="h6">Low</Typography>
                <Typography>
                  {temperature.temp_min} {CorF ? "°F" : "°C"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          flex={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <Typography variant="h5">Now</Typography>
            <Typography variant="h4">{weather[0].main}</Typography>
            <Typography variant="h5">{weather[0].description}</Typography>
          </Box>
          <Box display="flex" marginTop={1}>
            <Box marginRight={2} textAlign="center">
              <WbTwilightIcon />
              <Typography>
                {sunriseStr.getHours()}:{sunriseStr.getMinutes()}
              </Typography>
            </Box>
            <Box textAlign="center">
              <ModeNightIcon />
              <Typography>
                {sunsetStr.getHours()}:{sunsetStr.getMinutes()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box flex={3} marginLeft={2}>
          <Box display="flex">
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">Wind</Typography>
              <Typography>{wind.speed} m/s</Typography>
            </Box>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">Direction</Typography>
              <Typography>{wind.speed}°</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">Humidity</Typography>
              <Typography>{humidity}%</Typography>
            </Box>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">Visibility</Typography>
              <Typography>{visibility / 100}%</Typography>
            </Box>
          </Box>
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h6">Pressure</Typography>
            <Typography>{pressure} hPa</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default WeatherDataDisplay;

// WEATHER ICON CODES https://openweathermap.org/weather-conditions
