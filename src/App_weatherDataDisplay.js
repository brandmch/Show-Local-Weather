import "./App.css";
import { Box, Switch, Typography, Divider, Paper } from "@mui/material";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const WeatherDataDisplay = ({ weatherData, CorF, setCorF }) => {
  let {
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

  const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <Paper
      sx={{
        margin: 3,
        padding: 3,
        width: "80vw",
        alignSelf: "center",
        maxWidth: 850,
      }}
    >
      {/* Header */}
      <Box display="flex" marginBottom={1}>
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
                {temperature[CorF ? "fahrenheit" : "celcius"].temp}{" "}
                {CorF ? "°F" : "°C"}
              </Typography>
            </Box>

            <Typography marginBottom={1}>
              Feels Like:{" "}
              {temperature[CorF ? "fahrenheit" : "celcius"].feels_like}{" "}
              {CorF ? "°F" : "°C"}
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
                  {temperature[CorF ? "fahrenheit" : "celcius"].temp_max}{" "}
                  {CorF ? "°F" : "°C"}
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
                  {temperature[CorF ? "fahrenheit" : "celcius"].temp_min}{" "}
                  {CorF ? "°F" : "°C"}
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
            <Box marginRight={3} textAlign="center">
              <WbTwilightIcon />
              <Typography>{sunrise}</Typography>
            </Box>
            <Box textAlign="center">
              <ModeNightIcon />
              <Typography>{sunset}</Typography>
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
              <Typography>
                {wind.speed[CorF ? "imperial" : "metric"]}{" "}
                {[CorF ? "mph" : "m/s"]}
              </Typography>
            </Box>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">Direction</Typography>
              <Typography>{wind.deg}°</Typography>
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
