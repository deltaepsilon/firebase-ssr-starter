import React from 'react';
import './backdrop.css';

export default ({ children }) => {
  return <div className="backdrop">{children}</div>;
};
