import React from 'react';

const Input = (props) => {
  const { label, type, name, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}

export default Input;
