import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import WeatherDataDisplay from "./App_weatherDataDisplay";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import useWindowSize from "./useWindowSize";

const theme = createTheme({
  typography: {
    fontFamily: ["kanit"],
  },
});

function convertTime(num) {
  const newStr = new Date(parseInt(`${num}000`));
  let hour = newStr.getHours();
  let min = newStr.getMinutes();
  let tag = "AM";

  if (hour > 12) {
    hour -= 12;
    tag = "PM";
  }

  if (min < 10) {
    min = `0${min}`;
  }

  return `${hour}:${min} ${tag}`;
}

function App() {
  const [cityInput, setCityInput] = useState("");
  const [returnedCities, setReturnedCities] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [CorF, setCorF] = useState(true);

  const { width } = useWindowSize();

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
          sunrise: convertTime(data.sys.sunrise),
          sunset: convertTime(data.sys.sunset),
          weather: data.weather,
          wind: {
            ...data.wind,
            speed: {
              metric: data.wind.speed,
              imperial: (data.wind.speed / 0.44704).toFixed(1),
            },
          },
          visibility: data.visibility,
        });
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="#FFD1A8"
        minHeight={"100vh"}
      >
        <Box
          display="flex"
          marginTop={2}
          flexDirection={width > 850 ? "row" : "column"}
        >
          <Box flex={10} />
          <Box
            flex={10}
            marginTop={2}
            textAlign={width > 850 ? "end" : "center"}
          >
            <Typography variant="h1" sx={{ textShadow: "2px 2px 2px #998370" }}>
              {" "}
              Weather
            </Typography>
          </Box>

          {width > 850 ? <Box flex={1} /> : null}

          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            padding={3}
            marginRight="auto"
            marginLeft="auto"
            minWidth={350}
            // maxWidth={100}
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
          <Box flex={10} />
        </Box>
        {loading && (
          <Skeleton
            variant="rectangular"
            width="80vw"
            sx={{ alignSelf: "center", margin: 3 }}
            height={300}
          />
        )}
        {weatherData && !loading && (
          <WeatherDataDisplay
            weatherData={weatherData}
            setWeatherData={setWeatherData}
            CorF={CorF}
            setCorF={setCorF}
            width={width}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
export default App;
