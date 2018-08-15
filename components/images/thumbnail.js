import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { Icon } from 'rmwc/Icon';

import './images.css';

export function Thumbnail({ alt, height, src, width, setImageDetailSrc }) {
  const style = { dimensions: { height, width } };

  return (
    <div className="thumbnail" style={style.dimensions} onClick={() => setImageDetailSrc(src)}>
      <img src={src} alt={alt || ''} style={style.dimensions} />
      <Icon use="loupe" />
    </div>
  );
}

export default connect(
  '',
  actions
)(Thumbnail);
