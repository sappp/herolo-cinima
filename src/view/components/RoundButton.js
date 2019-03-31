import React from 'react';

const btnTypes = {
  1: "btn-outline-info",
  2: "btn btn-outline-secondary",
  3: "btn-outline-danger"
};
const RoundButton = ({ label, type = 1, disabled = false, onClick }) => (
  <button
    type="button"
    className={`RoundButton btn ${btnTypes[type]}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export default RoundButton;
