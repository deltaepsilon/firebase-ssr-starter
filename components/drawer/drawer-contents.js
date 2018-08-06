import React from 'react';
import Link from 'next/link';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import { DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemText } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';
import { Button } from 'rmwc/Button';

import '@material/button/dist/mdc.button.min.css';

import AccountIcon from '../user/account-icon';

import './drawer-contents.css';
import { AlertHandler } from '../handlers/alert-handler';

export function DrawerContents({
  beforeInstallEvent,
  claims,
  currentUser,
  pathname,
  handleSignOut,
}) {
  return (
    <div className="drawer-contents">
      <DrawerHeader>
        <div className="drawer-header">
          <AccountIcon currentUser={currentUser} />
          {currentUser && <span>{currentUser.displayName || currentUser.email}</span>}
        </div>
      </DrawerHeader>

      <hr />

      <DrawerContent>
        {claims && claims.isAdmin ? (
          <Active pathname={pathname} href="/admin">
            <ListItem>
              <ListItemText>
                <Link href="/admin" prefetch>
                  <a>
                    <Icon use="supervisor_account" />
                    <span>Admin</span>
                  </a>
                </Link>
              </ListItemText>
            </ListItem>
          </Active>
        ) : null}

        {currentUser ? (
          <Active pathname={pathname} href="/app/settings">
            <ListItem>
              <ListItemText>
                <Link href="/app/settings" prefetch>
                  <a>
                    <Icon use="settings" />
                    <span>Settings</span>
                  </a>
                </Link>
              </ListItemText>
            </ListItem>
          </Active>
        ) : null}

        {!currentUser ? (
          <ListItem>
            <Active pathname={pathname} href="/login">
              <ListItemText>
                <Link href="/login" prefetch>
                  <a>
                    <Icon use="input" />
                    <span>Sign in</span>
                  </a>
                </Link>
              </ListItemText>
            </Active>
          </ListItem>
        ) : null}

        {currentUser && (
          <ListItem onClick={signOut(handleSignOut)}>
            <ListItemText>
              <a>
                <Icon use="power_settings_new" />
                <span>Sign out</span>
              </a>
            </ListItemText>
          </ListItem>
        )}

        <h4>Public</h4>

        <Active pathname={pathname} href="/faq">
          <ListItem>
            <ListItemText>
              <Link href="/faq" prefetch>
                <a>
                  <Icon use="info" />
                  <span>FAQ</span>
                </a>
              </Link>
            </ListItemText>
          </ListItem>
        </Active>

        {beforeInstallEvent && (
          <ListItem>
            <ListItemText>
              <Button className="full-width" raised onClick={installToDesktop(beforeInstallEvent)}>
                <Icon use="get_app" />
                <span>Install App</span>
              </Button>
            </ListItemText>
          </ListItem>
        )}
      </DrawerContent>
    </div>
  );
}

export default connect(
  'beforeInstallEvent,claims,currentUser,pathname',
  actions
)(DrawerContents);

function signOut(handleSignOut) {
  return () => {
    handleSignOut();
    window.firebase.auth().signOut();
  };
}

function Active({ href, pathname, children }) {
  return (
    <span className="active" disabled={pathname == href} onClick={e => e.preventDefault()}>
      {children}
    </span>
  );
}

function installToDesktop(e) {
  return () => {
    e.prompt();

    e.userChoice.then(({ outcome }) => {
      if (outcome == 'dismissed') {
        Alert('Installation rejected');
      } else {
        Alert('Installating...');
      }
    });
  };
}
