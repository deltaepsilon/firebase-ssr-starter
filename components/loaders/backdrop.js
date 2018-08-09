import React from 'react';
import './backdrop.css';

export default ({ children, transitioning }) => {
  return <div className={`backdrop ${transitioning ? 'transitioning' : ''}`}>{children}</div>;
};
