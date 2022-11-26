import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const Weather = ({ countryName, countryCapital }) => {
  const [weather, setWeather] = useState([]);

  const api_key = process.env.REACT_APP_API_KEY;

  console.log(countryName);
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=" +
          api_key +
          "&q=" +
          countryName
      )
      .then((response) => setWeather(response.data));
  }, []);

  const currentWeather = weather.current;
  console.log(currentWeather);
  return (
    <>
      <h4>Weather in {countryCapital}</h4>
      <h5>{currentWeather.condition.text}</h5>
      <img
        src={currentWeather.condition.icon}
        alt={currentWeather.condition.text}
      />
      <p>Temperature: {currentWeather.temp_c} Celcius</p>
      <p>Feels like: {currentWeather.feelslike_c} Celcius</p>
      <p>Cloud cover: {currentWeather.cloud}%</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <p>Precipitation: {currentWeather.precip_mm}mm</p>
      <p>Wind: {currentWeather.wind_kph}kph {currentWeather.wind_dir}</p>
    </>
  );
};

//http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
