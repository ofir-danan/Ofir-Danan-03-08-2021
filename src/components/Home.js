import React, { useEffect, useState } from "react";
import store from "../store";
import dotenv from "dotenv";
import axios from "axios";
import { Heading } from "@chakra-ui/react";
import WeatherCard from "./WeatherCard";
import FavoriteCard from "./FavoriteCard";
import loader from "../images/loader.gif";

const apikey = process.env.REACT_APP_API_KEY;

function Home() {
  const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const locationId = store.getState().locationId;
  const unit = store.getState().unit;
  const city = store.getState().city;

  useEffect(() => {
    setIsLoading(true);
    // fetch weather of location if location or unit changes
    async function fetchWeather() {
      // five days weather
      const fiveDaysData = await axios(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=${apikey}&metric=${
          unit === "Metric"
        }`
      );
      // current location weather
      const { data } = await axios(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationId}?apikey=${apikey}`
      );
      setFiveDaysWeather(fiveDaysData.data);
      setCurrentWeather(data);
      setIsLoading(false);
    }

    fetchWeather();
  }, [unit, locationId]);

  while (isLoading) {
    return <img className="loading" src={loader} />;
  }

  return (
    <div className="body">
      <Heading as="h4" size="md" style={{ textAlign: "center" }}>
        {city}: {fiveDaysWeather.Headline.Text}
      </Heading>
      <div className="weather-data-home">
        <FavoriteCard
          currentWeather={currentWeather[0]}
          city={city}
          locationId={locationId}
        />
      </div>
      <div className="five-days-content">
        {fiveDaysWeather.DailyForecasts.map((day, i) => {
          return <WeatherCard key={i} weather={day} />;
        })}
      </div>
    </div>
  );
}

export default Home;
