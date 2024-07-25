import React from "react";

const inputform = ({ htmlfor, labelText, type, name, value }) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={htmlfor} className="form-label">
          {labelText}
        </label>
        <input type={type} className="form-control" name={name} value={value} />
      </div>
    </>
  );
};

export default inputform;
