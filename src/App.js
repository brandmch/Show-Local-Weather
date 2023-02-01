import { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";

function App() {
  const [cityInput, setCityInput] = useState("");
  console.log(cityInput);

  useEffect(() => {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=london,GB&limit=5&appid=0b03cdb17a8af366b8d2a6f9f57c6c6e"
    )
      .then((res) => res.json())
      .then((data) => {
        const long = data[0].lon;
        const lat = data[0].lat;
        return [lat, long];
      })
      .then((data) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=0b03cdb17a8af366b8d2a6f9f57c6c6e`
        )
          .then((res) => res.json())
          .then((data) => console.log(data))
      );
  }, []);

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
        <Button variant="contained">Get Weather</Button>
      </Box>
    </Box>
  );
}

export default App;
