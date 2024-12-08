import React from 'react';

const Button = ({ children, onClick, className, ...rest }) => {
  return (
    <button type="button" class="btn btn-warning" onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;