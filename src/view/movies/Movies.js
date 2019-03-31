import React from "react";
import { connect } from "react-redux";
import selectors from "../../selectors";
import actions from '../../state/actions';
import { prepTitle } from "../../services/utils";
import './Movies.css';
import MovieItem from './components/Movie-item';

const Movies = ({ moviesList, detailsList, onToggleSelect }) => (
  <section className="Movies">
    <div className="list-group ">
      {moviesList.map(movie => (
        <MovieItem
          movieTitle={prepTitle(detailsList[movie.imdbID].Title)}
          isSelected={movie.isSelected}
          onClick={() => onToggleSelect(movie.imdbID)}
        />
      ))}
    </div>
  </section>
);

const mapStateToProps = state => {
  return {
    moviesList: selectors.movies.getMoviesList(state),
    detailsList: selectors.movies.getMoviesDetails(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleSelect: id => dispatch(actions.movies.selectMovie(id)),
    // onDeSelect: id => dispatch(actions.selectedMovie.deselect())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
