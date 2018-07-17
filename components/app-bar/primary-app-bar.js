import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle,
} from 'rmwc/TopAppBar';

import '@material/top-app-bar/dist/mdc.top-app-bar.min.css';
import './primary-app-bar.css';

export function PrimaryAppBar({ title, toggleIsDrawerOpen }) {
  return (
    <div className="primary-app-bar">
      <TopAppBar style={{ top: 0 }}>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <div className="menu-icon-wrapper">
              <TopAppBarNavigationIcon use="menu" onClick={toggleIsDrawerOpen} />
            </div>
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>

          <TopAppBarSection alignEnd>
            <TopAppBarActionItem aria-label="Download" alt="Download">
              file_download
            </TopAppBarActionItem>
            <TopAppBarActionItem aria-label="Print this page" alt="Print this page">
              print
            </TopAppBarActionItem>
            <TopAppBarActionItem aria-label="Bookmark this page" alt="Bookmark this page">
              bookmark
            </TopAppBarActionItem>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    </div>
  );
}

export default connect(
  '',
  actions
)(PrimaryAppBar);
