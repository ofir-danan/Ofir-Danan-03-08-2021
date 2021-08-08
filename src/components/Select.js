import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "../store";
import dotenv from "dotenv";
import { setCityName, setKey } from "../actions";

const apikey = process.env.REACT_APP_API_KEY;

const Select = () => {
  const userPref = store.getState();
  const [city, setCity] = useState("");
  const [textInput, setTextInput] = useState("");
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    setCity(userPref.city);
  }, [userPref.city]);

  useEffect(() => {
    // API call for accuweather auto complete locations and setting the relevant data
    const fetchCityData = () => {
      axios(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${textInput}`
      ).then((res) => {
        const { data } = res;
        const list = data.map((city) => {
          return {
            name: city.LocalizedName,
            country: city.Country.LocalizedName,
            key: city.Key,
          };
        });
        setCityList(list);
      });
    };
    if (textInput) {
      fetchCityData();
    }
  }, [textInput]);

  const handleChange = (value) => {
    if (value) {
      setCity(value);
      store.dispatch(setKey(value.key));
      store.dispatch(setCityName(value.name));
    }
  };

  return (
    <Autocomplete
      options={cityList}
      getOptionLabel={(option) => {
        return option.name ? option.name : "";
      }}
      fullWidth={true}
      value={city}
      onChange={(event, value) => handleChange(value)}
      onInputChange={(event, value) => setTextInput(value)}
      getOptionSelected={(option, value) =>
        option.name === value.name || option === ""
      }
      renderInput={(params) => (
        <TextField
          {...params}
          value={textInput}
          label={"Location"}
          variant="outlined"
        />
      )}
      renderOption={(option) => (
        <span style={{ textTransform: "capitalize" }}>{option.name}</span>
      )}
    />
  );
};

export default Select;
