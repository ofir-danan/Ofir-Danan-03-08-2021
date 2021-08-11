import axios from "axios";
import {
  TEMP_UNIT,
  LOCATION_ID,
  DARK_MODE,
  FAVORITES,
  CITY,
  KEY,
  REMOVE_FAVORITE,
} from "./types";
const apikey = process.env.REACT_APP_API_KEY;

// get location key by location coordinates
export const getCurrentPosition = (coordinates) => {
  return async function fetchCurrentWeather(dispatch) {
    const res = await axios(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${coordinates}`
    );
    dispatch({
      type: LOCATION_ID,
      payload: { locationId: res.data.Key, city: res.data.EnglishName },
    });
  };
};

export const setUnit = (unit) => ({
  type: TEMP_UNIT,
  payload: unit,
});

export const setDarkMode = (darkMode) => ({
  type: DARK_MODE,
  payload: darkMode,
});

export const setFavorites = (favorites) => ({
  type: FAVORITES,
  payload: favorites,
});
export const removeFavorites = (index) => ({
  type: REMOVE_FAVORITE,
  payload: index,
});
export const setKey = (key) => ({
  type: KEY,
  payload: key,
});
export const setCityName = (city) => ({
  type: CITY,
  payload: city,
});
