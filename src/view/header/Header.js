import React from "react";
import { connect } from "react-redux";
import selectors from "../../selectors";
import actions from '../../state/actions';

import './Header.css';

import Title from './components/Title';
import Toolbar from './components/Toolbar';

const Header = ({ disableToolbar, onToolbarClick }) => (
  <header className="Header">
    <Title title={"Cinima Herolo"} />
    <Toolbar disable={disableToolbar} onClick={onToolbarClick} />
  </header>
);

const mapStateToProps = state => {
  return {
    disableToolbar: selectors.movies.getSelectedMovieID(state) === ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onChangeVersion: () => dispatch(actions.site.changeVersion()),
    onToolbarClick: (type) => {
      if(type === 'add') {
        dispatch(actions.modals.toggleShowAdd())
      }
      if(type === 'edit') {
        dispatch(actions.modals.toggleShowEdit());
      }
      if (type === 'delete') {
        dispatch(actions.modals.toggleShowDelete());
      }
    }
    // onShowEditModal: () => dispatch(actions.site.showEditModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
