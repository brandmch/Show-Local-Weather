import logo from "./logo.svg";
import "./App.css";

function App() {
  console.log("swag");

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

  // fetch(
  //   "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=24d97d22302d104b7ea6b85767ffa7e4"
  // )
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
