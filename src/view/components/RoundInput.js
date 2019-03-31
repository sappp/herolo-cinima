import React from 'react';

const RoundInput = ({
  fullLength = true,
  type = "text",
  label,
  placeholder,
  value,
  showError,
  errorMsg,
  onChange,
  onBlur
}) => (
  <div className={`RoundInput ${fullLength ? "" : "input-half-length"}`}>
    <label>{label}</label>
    <input
      type={type}
      className={`form-control ${showError ? "is-invalid" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={event => onChange(event.target.value)}
      onBlur={() => onBlur(label.toLowerCase())}
      // aria-label="Recipient's username"
      // aria-describedby="basic-addon2"
    />
    {
        showError && <div className="invalid-feedback">{errorMsg}</div>
          // <small class="form-text text-muted">{errorMsg}</small>
     }
    
    {/* <div className="input-group-append">
      <button className="btn btn-outline-success Search-button" type="button">
        Search
      </button>
    </div> */}
  </div>
  // <div className="input-group mb-3 ">
  //   <input
  //     className="form-control mr-sm-2"
  //     type="search"
  //     placeholder="Search"
  //     aria-label="Search"
  //   />
  //   <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
  //     Search
  //   </button>
  // </div>
);

export default RoundInput;
