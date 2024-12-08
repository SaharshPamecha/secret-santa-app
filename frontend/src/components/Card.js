import React from 'react';

const Card = ({ children, className, ...rest }) => {
  return (
    <div className={`card ${className}`} {...rest}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

export { Card, CardHeader, CardContent, CardTitle };