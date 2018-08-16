import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { IconButton } from 'rmwc/IconButton';

import copyToClipboard from '../../utilities/copy-to-clipboard';

import '@material/menu/dist/mdc.menu.min.css';

import './images.css';

export function ImageDetail({ src, setImageDetailSrc }) {
  return (
    src && (
      <div className="image-detail" onClick={e => !isMenuClick(e.target) && setImageDetailSrc()}>
        <img src={src} />

        <SimpleMenu
          handle={<IconButton use="more_vert" />}
          onSelected={handleSelected({ src, setImageDetailSrc })}
        >
          <MenuItem>Copy URL</MenuItem>
          <MenuItem>Close</MenuItem>
        </SimpleMenu>
      </div>
    )
  );
}

export default connect(
  '',
  actions
)(ImageDetail);

function isMenuClick(el) {
  let result = false;

  if (el.classList.contains('mdc-menu-anchor')) {
    result = true;
  } else if (!el.classList.contains('image-detail')) {
    result = isMenuClick(el.parentElement);
  }

  return result;
}

function handleSelected({ src, setImageDetailSrc }) {
  return e => {
    switch (e.detail.index) {
      case 0:
        copyToClipboard(src);
        break;
      default:
        setTimeout(() => setImageDetailSrc(), 300);
    }
  };
}
