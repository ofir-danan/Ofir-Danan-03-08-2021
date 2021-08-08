import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Weather_logos_transparent from "../images/Weather_logos_transparent.png";
import Weather_logos_white from "../images/Weather_logos_white.png";
import Settings from "./Settings";
import Select from "./Select";
import { Box, Tooltip } from "@chakra-ui/react";
import store from "../store";
import { CurrentLocation } from "@styled-icons/boxicons-regular/CurrentLocation";
import { getCurrentPosition } from "../actions";

function NevBar() {
  const location = useLocation();
  const userPref = store.getState();
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    // get current location coordinates
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }, []);

  const handelClick = () => {
    store.dispatch(getCurrentPosition(coordinates));
  };
  return (
    <>
      <Link to="/">
        <img
          src={
            userPref.darkMode ? Weather_logos_white : Weather_logos_transparent
          }
          alt="weather logo"
          className="logo"
        />
      </Link>
      <Tooltip label="Get Current Location" placement="left-start">
        <Link to="/">
          <CurrentLocation
            onClick={handelClick}
            size="34"
            style={{ margin: "20px" }}
          />
        </Link>
      </Tooltip>
      <Box w="30%">
        <Select />
      </Box>
      <nav className="nav">
        <ul>
          <li>
            <Link
              className={
                location.pathname === "/" ? "link current-page" : "link"
              }
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/favorites"
                  ? "link current-page"
                  : "link"
              }
              to="/favorites"
            >
              Favorites
            </Link>
          </li>
        </ul>
        <Settings />
      </nav>
    </>
  );
}

export default NevBar;
