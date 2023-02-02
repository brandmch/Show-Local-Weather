import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import WeatherDataDisplay from "./App_weatherDataDisplay";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["kanit"],
  },
});

function App() {
  const [cityInput, setCityInput] = useState("");
  const [returnedCities, setReturnedCities] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [CorF, setCorF] = useState(true);

  const getCities = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
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
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          city: city.name,
          state: city.state,
          country: city.country,
          temperature: {
            celcius: {
              feels_like: (data.main.feels_like - 273.15).toFixed(2),
              temp: (data.main.temp - 273.15).toFixed(2),
              temp_max: (data.main.temp_max - 273.15).toFixed(2),
              temp_min: (data.main.temp_min - 273.15).toFixed(2),
            },
            fahrenheit: {
              feels_like: (
                (data.main.feels_like - 273.15) * (9 / 5) +
                32
              ).toFixed(1),
              temp: ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(1),
              temp_max: ((data.main.temp_max - 273.15) * (9 / 5) + 32).toFixed(
                1
              ),
              temp_min: ((data.main.temp_min - 273.15) * (9 / 5) + 32).toFixed(
                1
              ),
            },
          },
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          weather: data.weather,
          wind: data.wind,
          visibility: data.visibility,
        });
        setLoading(false);
      });
  };

  console.log(weatherData);
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="dimgray"
        minHeight={"100vh"}
      >
        <Box
          display="flex"
          flexDirection="column"
          width={300}
          marginLeft="auto"
          marginRight="auto"
          padding={3}
        >
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
          <Button
            variant="contained"
            onClick={getCities}
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Get Weather
          </Button>
        </Box>
        {loading && <CircularProgress />}
        {weatherData && (
          <WeatherDataDisplay
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            CorF={CorF}
            setCorF={setCorF}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
export default App;
