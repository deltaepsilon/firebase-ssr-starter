import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import DrawerContents from './drawer-contents';

import { Drawer } from 'rmwc/Drawer';

import '@material/drawer/dist/mdc.drawer.min.css';
import './permanent-drawer.css';

export function PermanentDrawer() {
  return (
    <Drawer permanent>
      <DrawerContents />
    </Drawer>
  );
}

export default connect(
  '',
  actions
)(PermanentDrawer);
