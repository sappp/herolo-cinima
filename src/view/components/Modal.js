import React from "react";

export const ModalHeader = props => {
  return <div className="modal-header">{props.children}</div>;
};

export const ModalBody = props => {
  return <div className="modal-body">{props.children}</div>;
};

export const ModalFooter = props => {
  return <div className="modal-footer">{props.children}</div>;
};

const Modal = (props) => {
  return (
    <div
      className={`modal fade ${props.isOpen ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      style={{ top: '20%', color: 'black', display: props.isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
