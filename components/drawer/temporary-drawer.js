import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import DrawerContents from './drawer-contents';

import { Drawer } from 'rmwc/Drawer';

import '@material/drawer/dist/mdc.drawer.min.css';

export function TemporaryDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <Drawer temporary open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <DrawerContents />
    </Drawer>
  );
}

export default connect(
  'isDrawerOpen',
  actions
)(TemporaryDrawer);
