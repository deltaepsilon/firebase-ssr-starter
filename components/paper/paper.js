import React from 'react';
import { Elevation } from 'rmwc/Elevation';

import '@material/elevation/dist/mdc.elevation.min.css';

import './paper.css';

export default ({ className, style, z, onMouseOver, onMouseOut, children }) => {
  return (
    <div className={`paper ${className || ''}`} style={style}>
      <Elevation z={z || 0} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div className="contents">
          {children}
        </div>
      </Elevation>
    </div>
  );
};
