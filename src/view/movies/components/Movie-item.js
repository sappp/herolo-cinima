import React from "react";

const MovieItem = ({ movieTitle, isSelected, onClick }) => (
  <button
    key={movieTitle}
    className={`list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
    type="button"
    onClick={onClick}
  >
    {movieTitle}
  </button>
);

export default MovieItem;
