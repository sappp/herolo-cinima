import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger'

import { moviesActions, moviesReducer} from "./movies";
import { modalsActions, modalsReducer } from "./modals";

const reducers = combineReducers({
  movies: moviesReducer,
  modals: modalsReducer,
});

const actionsSet = {
  movies: moviesActions,
  modals: modalsActions,
};

const middleWares = applyMiddleware(
  thunkMiddleware,
  logger
)

export default (initialState) => {
  const store = createStore(reducers, initialState, middleWares);
  
  const actions = Object.keys(actionsSet).reduce((p1, key1) => {
    p1[key1] = Object.keys(actionsSet[key1]).reduce((p2, key2) => {
      p2[key2] = function() {
        const action = actionsSet[key1][key2].apply(null, arguments);
        store.dispatch(action);
        return action;
      };
      return p2;
    }, {});
    return p1;
  }, {});

  return {
    store,
    actions
  };
};
