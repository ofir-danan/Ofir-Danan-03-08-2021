import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import store from "./store";
import { getCurrentPosition } from "./actions";

function App() {
  const userPref = store.getState();
  const [coordinates, setCoordinates] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }, []);

  useEffect(() => {
    setDarkMode(Boolean(userPref.darkMode));
  }, [userPref.darkMode]);

  useEffect(() => {
    if (coordinates) {
      store.dispatch(getCurrentPosition(coordinates));
    }
  }, [coordinates]);
  return (
    <div className={darkMode ? "app darkMode" : "app"}>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/favorites" component={Favorites} />
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
