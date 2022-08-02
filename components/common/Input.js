import React from 'react';

const Input = (props) => {
  const { label, type, name, onChange, onBlur, errorMsg } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className="form-control"
      />
      <span className='text-danger'>{errorMsg}</span>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  className: 'form-control',
  isReq: null,
  reqType: '',
  value: '',
  onChange: () => { },
  onBlur: () => { },
  loading: null
}

export default Input;
