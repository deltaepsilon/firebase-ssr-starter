import React from 'react';
import Link from 'next/link';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { DrawerHeader, DrawerContent } from 'rmwc/Drawer';

import { ListItem, ListItemText } from 'rmwc/List';

import './drawer-contents.css';

export function DrawerContents(props) {
  return (
    <div className="drawer-contents">
      <DrawerHeader>
        <div className="drawer-header">hey guys!!!</div>
      </DrawerHeader>
      <DrawerContent>
        <ListItem>
          <ListItemText>
            <Link href="/insecure" prefetch>
              <a>Insecure</a>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link href="/secure" prefetch>
              <a>Secure</a>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link href="/login" prefetch>
              <a>Login</a>
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </DrawerContent>
    </div>
  );
}

export default connect(
  '',
  actions
)(DrawerContents);
