import React from 'react';

import './form.css';

export default function Form({ children, style }) {
  return (
    <div className="form" style={style || {}}>
      {children}
    </div>
  );
}
