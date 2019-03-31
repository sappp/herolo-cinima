import types from './types'
import * as moviesApi from '../../services/moviesApi';


const fetchMovies = input => ({
  type: types.FETCH_MOVIES
});

const fetchMoviesSuccess = data => ({
  type: types.FETCH_MOVIES_SUCCESS,
  payload: { data }
});

const fetchMoviesFaild = errorMsg => ({
  type: types.FETCH_MOVIES_FAILD,
  payload: { errorMsg }
});

const loadMovies = data => ({
  type: types.LOAD_MOVIES,
  payload: { data }
});

const loadDetails = data => ({
  type: types.LOAD_DETAILS,
  payload: { data }
});

const fetchMoviesOperation = (searchTerm) => (dispatch, getState) => {
  dispatch(fetchMovies());
  moviesApi
    .searchMovies(searchTerm)
    .then(res => {
      if (res && res["Response"] === "True") {
        
        dispatch(loadMovies(res["Search"]));
        const moviesDetails = {};
        res["Search"].forEach(movie => {
          const movieId = movie.imdbID;
          moviesApi.getMovieDetails(movieId).then(res => {
            moviesDetails[movieId] = res;
          });
        });
        dispatch(loadDetails(moviesDetails));
        
      }
      if (res && res["Response"] === "False") {
        dispatch(fetchMoviesFaild(res["Error"]));
      }

      setTimeout(() => {
        dispatch(fetchMoviesSuccess());
      }, 300);
    })
    .catch(e => {
      dispatch(fetchMoviesFaild("Something went wrong... try again."));
    });
};

const selectMovie = imdbID => ({
  type: types.SELECT_MOVIE,
  payload: { imdbID }
});

const deleteMovie = imdbID => ({
  type: types.DELETE_MOVIE,
  payload: { imdbID }
});

const addMovie = newMovie => ({
  type: types.ADD_MOVIE,
  payload: { newMovie }
});

const editMovie = movie => ({
  type: types.EDIT_MOVIE,
  payload: { movie }
});

export { fetchMoviesOperation, selectMovie, deleteMovie, addMovie, editMovie };
