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
import { Icon } from 'rmwc/Icon';

import '@material/top-app-bar/dist/mdc.top-app-bar.min.css';
import './primary-app-bar.css';

export function PrimaryAppBar({ currentUser, presence, title, toggleIsDrawerOpen }) {
  return (
    <div className={`primary-app-bar ${presence ? 'online' : 'offline'}`}>
      <TopAppBar style={{ top: 0 }}>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <div className="menu-icon-wrapper" role="button">
              <TopAppBarNavigationIcon use="menu" onClick={toggleIsDrawerOpen} />
            </div>
            <TopAppBarTitle>{title}</TopAppBarTitle>

            {currentUser &&
              !presence && (
                <div className="offline">
                  <Icon use="offline_bolt" />
                  <span>offline</span>
                </div>
              )}
          </TopAppBarSection>

          <TopAppBarSection alignEnd>
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
  'currentUser,presence',
  actions
)(PrimaryAppBar);
