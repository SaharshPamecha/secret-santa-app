import React from 'react';

const Label = ({ children, htmlFor, className, ...rest }) => {
  return (
    <label htmlFor={htmlFor} className={className} {...rest}>
      {children}
    </label>
  );
};

export default Label;