import React, { useEffect, useState } from "react";
import store from "../store";
import icons from "../images/icons";
import { Badge, Heading, Tooltip, Text } from "@chakra-ui/react";
import "react-clock/dist/Clock.css";
import { Star, StarFill } from "@styled-icons/bootstrap";
import { removeFavorites, setCityName, setFavorites, setKey } from "../actions";
import { Link } from "react-router-dom";

function FavoriteCard({ currentWeather, city, locationId }) {
  const { unit } = store.getState();
  const { favorites } = store.getState();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const include = favorites.find((item) => item.locationId === locationId);
    if (include) {
      setFavorite(true);
    }
  }, []);

  useEffect(() => {}, [favorite]);

  // change favorite status
  const handleChange = () => {
    setFavorite(!favorite);
    if (!favorite) {
      store.dispatch(setFavorites({ city: city, locationId: locationId }));
    }
    if (favorite) {
      const index = favorites.findIndex((item) => item.city === city);
      store.dispatch(removeFavorites(index));
    }
  };

  // set location data as primary in order to display it in home page by click
  const handelClick = () => {
    store.dispatch(setKey(locationId));
    store.dispatch(setCityName(city));
  };

  return (
    <div className="weather-data" onClick={handelClick}>
      <Tooltip label="Go To Accuweather" placement="left-start">
        <a href={currentWeather.Link}>
          <img
            src={icons[currentWeather.WeatherIcon]}
            alt={currentWeather.WeatherText}
            className="weather-icon"
          />
        </a>
      </Tooltip>

      <Tooltip label="Go To Home Page" placement="left-start">
        <Link to="/">
          <div className="image-labels">
            <Heading>
              {currentWeather.Temperature[unit].Value}{" "}
              {currentWeather.Temperature[unit].Unit}°
            </Heading>
            <Badge colorScheme={currentWeather.IsDayTime ? "green" : "purple"}>
              {currentWeather.IsDayTime ? "Day" : "Night"}
            </Badge>
          </div>
          <Heading>{currentWeather.WeatherText}</Heading>
          <div className="card-footer">
            <div>
              {" "}
              <Text>City: {city}</Text> <Text>Location ID: {locationId}</Text>
            </div>
            {favorite ? (
              <StarFill
                onClick={handleChange}
                size="24"
                style={{ zIndex: 2 }}
              />
            ) : (
              <Star onClick={handleChange} size="24" style={{ zIndex: 2 }} />
            )}
          </div>
        </Link>
      </Tooltip>
    </div>
  );
}

export default FavoriteCard;
