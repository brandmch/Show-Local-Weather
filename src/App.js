import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Paper,
  Switch,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

function toCelcius(temp) {
  return ((5 / 9) * (temp - 32)).toFixed(2);
}
function toFahrenheit(temp) {
  return (temp * (9 / 5) + 32).toFixed(1);
}

function App() {
  const [cityInput, setCityInput] = useState("");
  const [returnedCities, setReturnedCities] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [CorF, setCorF] = useState(true);

  useEffect(() => {
    const func = CorF ? toFahrenheit : toCelcius;

    if (weatherData) {
      setWeatherData({
        ...weatherData,
        temperature: {
          feels_like: func(weatherData.temperature.feels_like),
          temp: func(weatherData.temperature.temp),
          temp_max: func(weatherData.temperature.temp_max),
          temp_min: func(weatherData.temperature.temp_min),
        },
      });
    }
  }, [CorF]);

  const getCities = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=0b03cdb17a8af366b8d2a6f9f57c6c6e`
    )
      .then((res) => res.json())
      .then((data) => {
        let tempArr = data.reduce((acc, curr) => {
          const item = {
            name: curr.name,
            state: curr.state,
            country: curr.country,
            lon: curr.lon,
            lat: curr.lat,
          };
          return acc.find((ele) => ele.lon === item.lon && ele.lat === item.lat)
            ? acc
            : [...acc, item];
        }, []);
        setReturnedCities(tempArr);
      });
  };

  const getWeather = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=0b03cdb17a8af366b8d2a6f9f57c6c6e`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          city: city.name,
          state: city.state,
          country: city.country,
          temperature: {
            ...data.main,
            feels_like: toFahrenheit(
              (data.main.feels_like - 273.15).toFixed(2)
            ),
            temp: toFahrenheit((data.main.temp - 273.15).toFixed(2)),
            temp_max: toFahrenheit((data.main.temp_max - 273.15).toFixed(2)),
            temp_min: toFahrenheit((data.main.temp_min - 273.15).toFixed(2)),
          },
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          weather: data.weather,
          wind: data.wind,
          visibility: data.visibility,
        });
        setLoading(false);
      });
  };

  return (
    <Box
      height={"100vh"}
      display="flex"
      justifyContent="center"
      backgroundColor="dimgray"
    >
      <Box display="flex" flexDirection="column" marginTop={10}>
        <TextField
          id="region"
          label="Enter City"
          variant="filled"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <Paper>
          {returnedCities.map((curr) => {
            return (
              <Box
                onClick={() => {
                  getWeather(curr);
                  setLoading(true);
                  setCityInput("");
                  setReturnedCities([]);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "#FFFFFF",
                  },
                }}
                key={`${curr.lon}, ${curr.lat}`}
              >
                <Typography>
                  {curr.name}, {curr.state}, {curr.country}
                </Typography>
              </Box>
            );
          })}
        </Paper>
        <Button variant="contained" onClick={getCities}>
          Get Weather
        </Button>
        {loading && <CircularProgress />}
        {weatherData && (
          <Box>
            <Box display="flex">
              <Typography>F</Typography>
              <Switch value={CorF} onChange={(e) => setCorF(!CorF)} />
              <Typography>C</Typography>
            </Box>

            <Typography>
              {weatherData.city}, {weatherData.state}, {weatherData.country}
            </Typography>
            <Typography>
              Current Temperature: {weatherData.temperature.temp}{" "}
              {CorF ? "°F" : "°C"}
            </Typography>
            <Typography>
              Today's High: {weatherData.temperature.temp_max}{" "}
              {CorF ? "°F" : "°C"}
            </Typography>
            <Typography>
              Today's Low: {weatherData.temperature.temp_min}{" "}
              {CorF ? "°F" : "°C"}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
