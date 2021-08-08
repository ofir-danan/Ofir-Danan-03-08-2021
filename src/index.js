import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
