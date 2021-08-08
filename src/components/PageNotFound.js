import React from "react";
import weatherNotFound from "../images/weatherNotFound.png";

function PageNotFound() {
  return (
    <div>
      <img src={weatherNotFound} alt="Page not found" />
    </div>
  );
}

export default PageNotFound;
