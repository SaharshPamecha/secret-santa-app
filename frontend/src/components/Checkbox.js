import React from 'react';

const Checkbox = ({ id, checked, onChange, label, ...rest }) => {
  return (
    <label htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} {...rest} />
      {label}
    </label>
  );
};

export default Checkbox;
