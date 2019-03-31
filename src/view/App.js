import React from 'react';
import './App.css';
import { connect } from "react-redux";
import selectors from "../selectors";


import Header from './header/Header';
import Movies from './movies/Movies';

import DeleteModal from './delete-modal/DeleteModal';
import AddEditModal from "./add-edit-modal/AddEditModal";

const App = ({ loading, mountAddEditModal }) => (
  <div className="App">
    <Header />
    {!loading && <Movies />}
    {!loading && <DeleteModal />}
    {!loading && mountAddEditModal && <AddEditModal />}
    {loading && <div>Loading...</div>}
  </div>
);

const mapStateToProps = state => {
  return {
    loading: selectors.movies.getLoading(state),
    mountAddEditModal: selectors.modals.getShowAdd(state) || selectors.modals.getShowEdit(state), 
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
