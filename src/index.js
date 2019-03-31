import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap-css-only";
import configureStore from "./state/configureStore";
// import actions from './state/actions';
import App from "./view/App";

const {store, actions} = configureStore({});
// debug stuff
Object.defineProperty(window, "state", { get: store.getState });
console.log(actions);
// window.selectors = selectors;
// window.actions = store.actions;
// window.constants = store.constants;
console.log('********************************************* \n DEVELOPMENT MODE \n window.state available \n window.selectors available \n ********************************************* \n');
actions.movies.fetchMoviesOperation('batman');
// actions.movies.fetchDetailsOperation();
// moviesApi.getMovies("a").then(res => {
//   console.log(res);
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);