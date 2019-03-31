import React from 'react';

const VersionChanger = ({ simpleVersion, onClick }) => (
  <div
    className="Header-version-changer btn-group"
    role="group"
    aria-label="Basic example"
  >
    <button
      type="button"
      className={`btn Version-changer-l-btn ${simpleVersion ? "Version-changer-btn-active" : ''}`}
      onClick={onClick}
    >
      simple
    </button>
    <button
      type="button"
      className={`btn Version-changer-r-btn ${!simpleVersion ? "Version-changer-btn-active" : ''}`}
      onClick={onClick}
    >
      extended
    </button>
  </div>
);

export default VersionChanger;
