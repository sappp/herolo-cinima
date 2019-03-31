import React from "react";
// import { connect } from "react-redux";
// import selectors from "../../selectors";
// import actions from '../../state/actions';

// import "./Toolbar.css";
import { MdAdd, MdModeEdit, MdDelete } from "react-icons/md";

const Toolbar = ({ disable, onClick }) => (
  <section className="Toolbar btn-group" role="group">
    <button className="btn add-btn" onClick={() => onClick('add')}>
      <MdAdd />
    </button>
    <button className="btn edit-btn" disabled={disable} onClick={() => onClick('edit')}>
      <MdModeEdit />
    </button>
    <button
      className="btn delete-btn"
      disabled={disable}
      onClick={() => onClick('delete')}
    >
      <MdDelete />
    </button>
  </section>
);


export default Toolbar;
