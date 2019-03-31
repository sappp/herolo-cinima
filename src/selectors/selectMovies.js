import { createSelector } from 'reselect'
import { uppercaseAll, cleanSpecialChars } from "../services/utils";

export const getMoviesData = state => state.movies.list;
export const getMoviesDetails = state => state.movies.details;
export const getLoading = state => state.movies.loading;
export const getShowError = state => state.movies.error.show;
export const getErrorMsg = state => state.movies.error.msg;
export const getSelectedMovieID = state => state.movies.selectedMovieId;


export const getMoviesList = createSelector(
  [getMoviesData, getSelectedMovieID],
  (list, selectedId) =>
    list.map(movie => ({
      imdbID: movie.imdbID,
      title: uppercaseAll(cleanSpecialChars(movie.Title)),
      isSelected: selectedId === movie.imdbID
    }))
);

const getSelectedMovieDetails = createSelector(
  [getMoviesDetails, getSelectedMovieID],
  (moviesDetailsObj, selectedId) => moviesDetailsObj[selectedId]
);

const getSelectedMovieTitle = createSelector(
  [getSelectedMovieDetails],
  movie => (movie ? movie["Title"] : "")
);

const getAllTitles = createSelector(
  [getMoviesDetails],
  detailsList => {
    console.log(Object.values(detailsList));
    console.log(Object.values(detailsList).map(movie => movie.Title));
    return Object.values(detailsList).map(movie => movie.Title);
  }
);

export default {
  getLoading,
  getMoviesList,
  getMoviesDetails,
  getShowError,
  getErrorMsg,
  getSelectedMovieID,
  getSelectedMovieDetails,
  getSelectedMovieTitle,
  getAllTitles
};
