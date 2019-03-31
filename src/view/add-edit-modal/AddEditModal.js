import React, { useState } from "react";
import { connect } from "react-redux";
import selectors from "../../selectors";
import actions from '../../state/actions';
import { checkMatchStrings } from '../../services/utils';
import "./AddEditModal.css";

import Modal, { ModalHeader, ModalBody, ModalFooter } from '../components/Modal';
import RoundInput from '../components/RoundInput';
import RoundButton from '../components/RoundButton';

const AddEditModal = ({ show, isAddModal, movieDetails, allTitles, onClose, onAddMovie, onEditMovie }) => {
  const [title, setTitle] = useState(movieDetails.Title);
  const [year, setYear] = useState(movieDetails.Year);
  const [runtime, setRuntime] = useState(movieDetails.Runtime);
  const [genre, setGenre] = useState(movieDetails.Genre);
  const [director, setDirector] = useState(movieDetails.Director);

  const [touched, setTouched] = useState({
    title: false,
    year: false,
    runtime: false,
    genre: false,
    director: false
  });

  const handleBlur = field => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const [titleUnique, setTitleUnique] = useState(true);

  const validate = () => {
    return {
      title: title.length === 0,
      year: year.toString().length < 4 || year.toString().length > 4,
      runtime: runtime.length === 0,
      genre: genre.length === 0,
      director: director.length === 0
    };
  };

  const cleanForm = () => {
    setTitle("");
    setYear(0);
    setRuntime("");
    setGenre("");
    setDirector("");
    setTouched({
      title: false,
      year: false,
      runtime: false,
      genre: false,
      director: false
    });
  };
  const errors = validate(title, year, runtime, genre, title, director);

  const isEnabled = !Object.keys(errors).some(x => errors[x])

  const showError = field => {
    const hasError = errors[field];
    const shouldShow = touched[field];

    return hasError ? shouldShow : false;
  };
  const titleErrorMsg = () => {
    return titleUnique ? "Can not be empty" : "Name already exist";
  };
  

  const handleSubmit = () => {
    const isUnique = !allTitles.some(t => checkMatchStrings(t, title));
    if (isUnique) {
      if (isAddModal) {
        onAddMovie({
          imdbID: Math.random().toFixed(5),
          Title: title,
          Year: year,
          Runtime: runtime,
          Genre: genre,
          Director: director
        });
      } else {
        onEditMovie({
          ...movieDetails,
          Title: title,
          Year: year,
          Runtime: runtime,
          Genre: genre,
          Director: director
        });
      }
      
      setTitleUnique(true);
      cleanForm();
      onClose();
    } else {
      setTitleUnique(false);
    }
  };

  return (
    <section className="AddEditModal">
      <Modal isOpen={show}>
        <ModalHeader>
          <h3>{isAddModal ? "Add new movie" : "Edit"}</h3>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <RoundInput
                label={"Title"}
                placeholder={"Title..."}
                value={title}
                showError={showError("title") || !titleUnique}
                errorMsg={titleErrorMsg()}
                onChange={setTitle}
                onBlur={handleBlur}
              />
              <div className="m-input-row">
                <RoundInput
                  fullLength={false}
                  type="number"
                  label={"Year"}
                  // placeholder={"ex 2019..."}
                  value={year}
                  showError={showError("year")}
                  errorMsg={"Please provide valid year, ex 2018"}
                  onChange={setYear}
                  onBlur={handleBlur}
                />
                <RoundInput
                  fullLength={false}
                  label={"Runtime"}
                  placeholder={"Runtime..."}
                  value={runtime}
                  showError={showError("runtime")}
                  errorMsg={"Can not be empty"}
                  onChange={setRuntime}
                  onBlur={handleBlur}
                />
              </div>

              <RoundInput
                label={"Genre"}
                placeholder={"Genre..."}
                value={genre}
                showError={showError("genre")}
                errorMsg={"Can not be empty"}
                onChange={setGenre}
                onBlur={handleBlur}
              />
              <RoundInput
                label={"Director"}
                placeholder={"Director..."}
                value={director}
                showError={showError("director")}
                errorMsg={"Can not be empty"}
                onChange={setDirector}
                onBlur={handleBlur}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <RoundButton
            label={"Cancel"}
            type={2}
            onClick={() => {
              cleanForm();
              onClose();
            }}
          />
          <RoundButton
            label={"OK"}
            onClick={() => handleSubmit()}
            disabled={!isEnabled}
          />
        </ModalFooter>
      </Modal>
    </section>
  );
};

const mapStateToProps = state => {
  const emptyMovieItem = {
    imdbID: "",
    Title: "",
    Year: "",
    Runtime: "",
    Genre: "",
    Director: ""
  }
  const moviesDetails = selectors.modals.getShowAdd(state) ?
    emptyMovieItem : selectors.movies.getSelectedMovieDetails(state)
  return {
    show:
      selectors.modals.getShowAdd(state) ||
      selectors.modals.getShowEdit(state),
    isAddModal: selectors.modals.getShowAdd(state) ? true : false,
    movieDetails: moviesDetails,
    allTitles: Object.values(selectors.movies.getMoviesDetails(state))
      .filter(m => m.imdbID !== moviesDetails.imdbID)
      .map(movie => movie.Title)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(actions.modals.closeAddEdit()),
    onAddMovie: newMovie => dispatch(actions.movies.addMovie(newMovie)),
    onEditMovie: movie => dispatch(actions.movies.editMovie(movie))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditModal);
