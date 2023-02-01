import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

// function toCelcius

function App() {
  const [cityInput, setCityInput] = useState("");
  const [returnedCities, setReturnedCities] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [CorF, setCorF] = useState(true);

  console.log(weatherData);

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
      .then((data) =>
        setWeatherData({
          city: city.name,
          state: city.state,
          country: city.country,
          temperature: data.main,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          weather: data.weather,
          wind: data.wind,
          visibility: data.visibility,
        })
      );
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
        {weatherData && (
          <Box>
            <Switch />
            <Typography>
              {weatherData.city}, {weatherData.state}, {weatherData.country}
            </Typography>
            <Typography>
              Current Temperature: {weatherData.temperature.temp}
            </Typography>
            <Typography>
              Today's High: {weatherData.temperature.temp_max}
            </Typography>
            <Typography>
              Today's Low: {weatherData.temperature.temp_min}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
