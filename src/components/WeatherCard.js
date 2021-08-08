import React from "react";
import { Text, Heading, Tooltip } from "@chakra-ui/react";
import icons from "../images/icons";

function WeatherCard({ weather }) {
  // formatting the date
  const date = String(new Date(weather.Date)).slice(0, 15);

  return (
    <div className="card weather-data">
      <Text fontSize="sm">{date}</Text>
      <Tooltip label="Go to accuweather" placement="left-start">
        <a href={weather.Link}>
          <img src={icons[weather.Day.Icon]} alt={weather.Day.IconPhrase} />
        </a>
      </Tooltip>
      <div className="image-labels">
        <Heading>
          {weather.Temperature.Minimum.Value}
          <Text fontSize="xl" style={{ display: "inline" }}>
            {weather.Temperature.Minimum.Unit}°{" "}
          </Text>{" "}
          - {weather.Temperature.Maximum.Value}
          <Text fontSize="xl" style={{ display: "inline" }}>
            {weather.Temperature.Maximum.Unit}°
          </Text>
        </Heading>
      </div>
      <Text fontSize="xl">
        {weather.Day.IconPhrase}-{weather.Night.IconPhrase}
      </Text>
    </div>
  );
}

export default WeatherCard;
