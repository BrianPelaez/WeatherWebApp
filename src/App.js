import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { weatherOptions, WEATHER_API_URL } from "./api.js";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    //console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    console.log(searchData.value);

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/city/latlon/${lat}/${lon}`,
      weatherOptions
    );

    const currentForecastFetch = fetch(
      `${WEATHER_API_URL}/city/fivedaysforcast/${lat}/${lon}`,
      weatherOptions
    );

    Promise.all([currentWeatherFetch, currentForecastFetch]).then(
      async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setCurrentForecast({ city: searchData.label, ...forecastResponse });
      }
    ).catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(currentForecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {currentForecast && <Forecast data={currentForecast}/>}
    </div>
  );
}

export default App;
