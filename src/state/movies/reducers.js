import { combineReducers } from 'redux';
import types from './types';

/* State Shape
{
    list: [],
    details: {},
    loading: bool,
    error: {
      show: bool,
      msg: string
    },
    selectedMovieId: string,
}
*/

const listReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MOVIES:
      return action.payload.data;
    case types.DELETE_MOVIE:
      const id = action.payload.imdbID;
      return state.filter(movie => movie.imdbID !== id);
    case types.ADD_MOVIE:
      const imdbID = action.payload.newMovie.imdbID;
      const Title = action.payload.newMovie.Title;
      return [...state, { imdbID, Title }];
    default:
      return state;
  }
};

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_DETAILS:
      return action.payload.data;
    case types.DELETE_MOVIE:
      const removeId = action.payload.imdbID;
      return Object.keys(state)
        .filter(keyId => removeId)
        .reduce((result, currentId) => {
          result[currentId] = state[currentId];
          return result;
        }, {});
    case types.ADD_MOVIE:
      const imdbID = action.payload.newMovie.imdbID;
      return {
        ...state,
        [imdbID]: {
          ...action.payload.newMovie
        }
      };
    case types.EDIT_MOVIE:
      const thisId = action.payload.movie.imdbID;
      return {
        ...state,
        [thisId]: action.payload.movie
      };
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES:
      return true;
    case types.FETCH_MOVIES_SUCCESS:
      return false;
    case types.FETCH_MOVIES_FAILD:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = { show: false, msg: "" }, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES_SUCCESS:
      if (state.show) {
        return {
          show: false,
          msg: ""
        };
      } else {
        return state;
      }
    case types.FETCH_MOVIES_FAILD:
      return {
        show: true,
        msg: action.payload.errorMsg
      };
    default:
      return state;
  }
};

const selectedMovieIdReducer = (state = "", action) => {
  switch (action.type) {
    case types.SELECT_MOVIE:
      if (action.payload.imdbID === state) {
        return "";
      }
      return action.payload.imdbID || "";
    case types.DELETE_MOVIE:
      return ""
    default:
      return state;
  }
};


export default combineReducers({
  list: listReducer,
  details: detailsReducer,
  loading: loadingReducer,
  error: errorReducer,
  selectedMovieId: selectedMovieIdReducer
});
