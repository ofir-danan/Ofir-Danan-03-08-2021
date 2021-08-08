import {
  TEMP_UNIT,
  LOCATION_ID,
  DARK_MODE,
  FAVORITES,
  CITY,
  KEY,
  REMOVE_FAVORITE,
} from "../actions/types";

// getting all the user info from local storage
const localstorgeLocationId = localStorage.getItem("locationId");
const localstorgeUnit = localStorage.getItem("unit");
const localstorgeCity = localStorage.getItem("city");
const localstorgeDarkMode = () => localStorage.getItem("darkMode") === "true";
const localstorgeFavorites = JSON.parse(localStorage.getItem("favorites"));

// setting local storage values if exists and if not initial values
const userPref = (
  state = {
    locationId: localstorgeLocationId || 215854,
    unit: localstorgeUnit || "Metric",
    city: localstorgeCity || "Tel Aviv",
    darkMode: localstorgeDarkMode || false,
    favorites: localstorgeFavorites || [],
  },
  action
) => {
  switch (action.type) {
    case TEMP_UNIT:
      localStorage.setItem("unit", action.payload);
      return {
        ...state,
        unit: action.payload,
      };
    case LOCATION_ID:
      localStorage.setItem("locationId", action.payload.locationId);
      localStorage.setItem("city", action.payload.city);
      return {
        ...state,
        locationId: action.payload.locationId,
        city: action.payload.city,
      };
    case DARK_MODE:
      localStorage.setItem("darkMode", Boolean(action.payload));
      return {
        ...state,
        darkMode: Boolean(action.payload),
      };
    case CITY:
      localStorage.setItem("city", action.payload);
      return {
        ...state,
        city: action.payload,
      };
    case KEY:
      localStorage.setItem("locationId", action.payload);
      return {
        ...state,
        locationId: action.payload,
      };
    case REMOVE_FAVORITE:
      const removedArray = state.favorites.filter(
        (favorite, index) => index !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(removedArray));
      return {
        ...state,
        favorites: removedArray,
      };
    case FAVORITES:
      const favoritesArray = [...state.favorites, action.payload];
      const filteredArray = favoritesArray.filter(
        (favorite, index, self) =>
          index ===
          self.findIndex(
            (f) =>
              f.city === favorite.city && f.locationId === favorite.locationId
          )
      );
      localStorage.setItem("favorites", JSON.stringify(filteredArray));
      return {
        ...state,
        favorites: filteredArray,
      };
    default:
      return state;
  }
};

export default userPref;
