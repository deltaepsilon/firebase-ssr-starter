import React from 'react';
import './three-bounce-loader.css';

export default props => {
  return (
    <div className="sk-three-bounce">
      <div className="sk-child sk-bounce1" />
      <div className="sk-child sk-bounce2" />
      <div className="sk-child sk-bounce3" />
    </div>
  );
};
