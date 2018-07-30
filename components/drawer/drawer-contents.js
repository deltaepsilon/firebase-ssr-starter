import React from 'react';
import Link from 'next/link';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { DrawerHeader, DrawerContent } from 'rmwc/Drawer';

import { ListItem, ListItemText } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

import md5 from 'md5';
import './drawer-contents.css';

export function DrawerContents({ claims, currentUser, pathname }) {
  return (
    <div className="drawer-contents">
      <DrawerHeader>
        <div className="drawer-header">
          <AccountIcon currentUser={currentUser} />
          {currentUser && <span>{currentUser.displayName || currentUser.email}</span>}
        </div>
      </DrawerHeader>
      <DrawerContent>
        {claims &&
          claims.isAdmin && (
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
          )}
        {currentUser && (
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
        )}
        <ListItem>
          {!currentUser && (
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
          )}
        </ListItem>
        {currentUser && (
          <ListItem onClick={signOut}>
            <ListItemText>
              <Icon use="power_settings_new" />
              <span>Sign out</span>
            </ListItemText>
          </ListItem>
        )}
        <hr />
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
      </DrawerContent>
    </div>
  );
}

export default connect(
  'claims, currentUser, pathname',
  actions
)(DrawerContents);

function signOut() {
  window.firebase.auth().signOut();
}

function AccountIcon({ currentUser }) {
  let icon = <Icon use="account_circle" />;

  if (currentUser) {
    if (currentUser.photoURL) {
      icon = <Icon strategy="url" use={currentUser.photoURL} />;
    } else if (currentUser.email) {
      icon = (
        <Icon strategy="url" use={`https://www.gravatar.com/avatar/${md5(currentUser.email)}`} />
      );
    }
  }

  return icon;
}
function Active({ href, pathname, children }) {
  return (
    <div disabled={pathname == href} onClick={e => e.preventDefault()}>
      {children}
    </div>
  );
}
