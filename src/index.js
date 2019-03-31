import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap-css-only";
import configureStore from "./state/configureStore";

import App from "./view/App";

const {store, actions} = configureStore({});

actions.movies.fetchMoviesOperation('batman');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);