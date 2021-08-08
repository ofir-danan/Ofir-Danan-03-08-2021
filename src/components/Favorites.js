import React, { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import axios from "axios";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import store from "../store";
import loader from "../images/loader.gif";

const apikey = process.env.REACT_APP_API_KEY;

function Favorites() {
  const [value, setValue] = useState(new Date());
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [favoriteCitiesWeather, setFavoriteCitiesWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // clock interval
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setFavoriteCities(store.getState().favorites);
  }, []);

  useEffect(() => {
    const currentArray = [];
    async function fetchCurrentWeather(item) {
      const { data } = await axios(
        `http://dataservice.accuweather.com/currentconditions/v1/${item.locationId}?apikey=${apikey}`
      );
      const info = data[0];
      return { ...item, ...info };
    }
    if (favoriteCitiesWeather.length < favoriteCities.length && !isFetching) {
      setIsFetching(true);
      // for each favorite get current weather
      favoriteCities.forEach(async (item, index, key) => {
        const res = await fetchCurrentWeather(item);
        currentArray.push(res);
        setFavoriteCitiesWeather(currentArray);
      });
    }
    if (
      favoriteCitiesWeather.length === favoriteCities.length &&
      favoriteCitiesWeather.length > 0
    ) {
      setIsFetching(false);
      setIsLoading(false);
    }
    if (favoriteCities.length === 0) {
      setIsLoading(false);
    }
  }, [favoriteCitiesWeather, favoriteCities, isFetching]);

  if (isLoading) {
    return <img className="loading" alt="loader" src={loader} />;
  }
  return (
    <div className="body">
      <div className="favorites">
        <div className="clock">
          <p>Current time:</p>
          <Clock value={value} />
        </div>
        <div className="weather-data">
          {favoriteCitiesWeather.map((city, key) => (
            <FavoriteCard
              key={key}
              currentWeather={city}
              city={city.city}
              locationId={city.locationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
