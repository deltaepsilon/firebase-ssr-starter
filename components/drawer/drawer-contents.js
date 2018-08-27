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
import NotificationCountBubble from '../notifications/notification-count-bubble';

import './drawer-contents.css';

export function DrawerContents({
  beforeInstallEvent,
  claims,
  currentUser,
  environment,
  notifications,
  pathname,
  handleSignOut,
  setIsDrawerOpen
}) {
  const showModeratorMessages = claims && (claims.isAdmin || claims.isModerator);
  const messageNotifications = notifications.filter(
    ({ type }) => type == environment.notifications.MESSAGE
  );
  const messageNotificationsCount = messageNotifications.length;

  return (
    <div className="drawer-contents" onClick={() => setIsDrawerOpen(false)}>
      <DrawerHeader>
        <div className="drawer-header">
          <AccountIcon currentUser={currentUser} />
          {currentUser && <span>{currentUser.displayName || currentUser.email}</span>}
        </div>
      </DrawerHeader>

      <hr />

      <DrawerContent>
        <div>
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
        </div>

        <div>
          {currentUser && (
            <Active pathname={pathname} href="/app/dashboard">
              <ListItem>
                <ListItemText>
                  <Link href="/app/dashboard" prefetch>
                    <a className="dashboard">
                      <Icon use="dashboard" />
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </ListItemText>
              </ListItem>
            </Active>
          )}
        </div>

        <div>
          {currentUser && !showModeratorMessages ? (
            <Active pathname={pathname} href="/app/messages">
              <ListItem>
                <NotificationCountBubble count={messageNotificationsCount} />
                <ListItemText>
                  <Link href="/app/messages" prefetch>
                    <a className="messages">
                      <Icon use="chat" />
                      <span>Messages</span>
                    </a>
                  </Link>
                </ListItemText>
              </ListItem>
            </Active>
          ) : null}
        </div>

        <div>
          {showModeratorMessages ? (
            <Active pathname={pathname} href="/admin/messages">
              <ListItem>
                <ListItemText>
                  <Link href="/admin/messages" prefetch>
                    <a className="messages">
                      <Icon use="messages" />
                      <span>Moderation</span>
                    </a>
                  </Link>
                </ListItemText>
              </ListItem>
            </Active>
          ) : null}
        </div>

        <div>
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
        </div>

        <div>
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
                <a tabIndex="0">
                  <Icon use="power_settings_new" />
                  <span>Sign out</span>
                </a>
              </ListItemText>
            </ListItem>
          )}
        </div>

        <h4>Public</h4>

        <div>
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
        </div>

        <div>
          {beforeInstallEvent && (
            <ListItem>
              <ListItemText>
                <Button
                  className="full-width"
                  raised
                  onClick={installToDesktop(beforeInstallEvent)}
                >
                  <Icon use="get_app" />
                  <span>Install App</span>
                </Button>
              </ListItemText>
            </ListItem>
          )}
        </div>
      </DrawerContent>
    </div>
  );
}

export default connect(
  'beforeInstallEvent,claims,currentUser,environment,notifications,pathname',
  actions
)(DrawerContents);

function signOut(handleSignOut) {
  return async () => {
    await handleSignOut();
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
