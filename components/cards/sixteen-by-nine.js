import React from 'react';
import './card.css';

export default ({ centered, children, style }) => {
  const className = `${centered ? 'centered' : ''}`;

  return (
    <div className="sixteen-by-nine" style={style}>
      <div className={className}>{children}</div>
    </div>
  );
};
