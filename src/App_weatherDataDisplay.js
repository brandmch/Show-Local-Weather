import "./App.css";
import { Box, Switch, Typography, Divider, Paper } from "@mui/material";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ModeNightIcon from "@mui/icons-material/ModeNight";

function capitalize(str) {
  return str
    .split(" ")
    .reduce((acc, curr) => {
      let tempStr = curr.split("");
      tempStr[0] = tempStr[0].toUpperCase();
      return [...acc, tempStr.join("")];
    }, [])
    .join(" ");
}

const WeatherDataDisplay = ({ weatherData, CorF, setCorF, width }) => {
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

  const Header = () => {
    return (
      <Box display="flex" marginBottom={1}>
        <Typography variant="h3" flex={10}>
          {city}, {state}, {country}
        </Typography>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          alignItems={width > 905 ? "center" : "start"}
        >
          <Typography>F</Typography>
          <Switch checked={!CorF} onChange={(e) => setCorF(!CorF)} />
          <Typography>C</Typography>
        </Box>
      </Box>
    );
  };

  const TemperatureBox = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        flex={5}
        justifyContent={width > 905 ? null : "center"}
        marginRight={width > 905 ? null : 2}
      >
        <img src={weatherIcon} style={{ width: 200, height: 200 }}></img>
        <Box marginLeft={width > 905 ? null : 3}>
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
    );
  };

  const WeatherBox = () => {
    return (
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
          <Typography variant="h5">
            {capitalize(weather[0].description)}
          </Typography>
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
    );
  };

  const MiscBox = () => {
    return (
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
        <Box flex={1} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">Pressure</Typography>
          <Typography>{pressure} hPa</Typography>
        </Box>
      </Box>
    );
  };

  return width > 905 ? (
    <Paper
      sx={{
        margin: 3,
        padding: 3,
        width: "80vw",
        alignSelf: "center",
        maxWidth: 850,
        boxShadow: "2px 2px 1px 1px #CDB096",
      }}
    >
      <Header />
      <Box display="flex" alignItems="center">
        <TemperatureBox />
        <Divider flexItem orientation="vertical" />
        <WeatherBox />
        <Divider flexItem orientation="vertical" />
        <MiscBox />
      </Box>
    </Paper>
  ) : (
    <Paper
      sx={{
        width: 400,
        alignSelf: "center",
        padding: 3,
        marginBottom: 3,
        boxShadow: "2px 2px 1px 1px #CDB096",
      }}
    >
      <Header />
      <Box display="flex" flexDirection="column">
        <TemperatureBox />
        <Divider />
        <Box display="flex" marginTop={1}>
          <WeatherBox />
          <Divider flexItem orientation="vertical" />
          <MiscBox />
        </Box>
      </Box>
    </Paper>
  );
};

export default WeatherDataDisplay;

// WEATHER ICON CODES https://openweathermap.org/weather-conditions
