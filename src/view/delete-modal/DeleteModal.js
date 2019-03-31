import React from "react";
import { connect } from "react-redux";
import selectors from "../../selectors";
import actions from '../../state/actions';
import Modal, { ModalBody, ModalFooter } from '../components/Modal';
import RoundButton from '../components/RoundButton';


const DeleteModal = ({ show, imdbID, movieTitle, onToggle, onDelete }) => (
  <section className="DeleteModal">
    <Modal isOpen={show}>
      <ModalBody>
        <p>
          Delete
          <span style={{ color: "#e83e8c" }}> {movieTitle}</span>?
        </p>
      </ModalBody>
      <ModalFooter>
        <RoundButton 
          type={2}
          label={"Cancel"}
          onClick={onToggle}
        />
        <RoundButton
          label={"OK"}
          type={3}
          onClick={() => onDelete(imdbID)}
        />
      </ModalFooter>
    </Modal>
  </section>
);

const mapStateToProps = state => {
  return {
    show: selectors.modals.getShowDelete(state),
    imdbID: selectors.movies.getSelectedMovieID(state),
    movieTitle: selectors.movies.getSelectedMovieTitle(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.modals.toggleShowDelete()),
    onDelete: imdbID => {
      dispatch(actions.movies.deleteMovie(imdbID));
      dispatch(actions.modals.toggleShowDelete());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModal);
