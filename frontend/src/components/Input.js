import React from 'react';

const Input = ({ type, placeholder, value, onChange, ...rest }) => {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;