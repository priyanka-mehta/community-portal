import React from 'react';

const Input = (props) => {
  const { label, type, name, onChange, onBlur, errorMsg, max } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className="form-control"
        max={max}
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
