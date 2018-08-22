/* globals firebase */
import React from 'react';
import { withRouter } from 'next/router';
import { Provider } from 'unistore/react';
import { mappedActions, store } from '../../datastore';

// Head tags
import FontsHead from '../head/fonts';
import MetaHead from '../head/meta';
import { AppStyle } from '../head/styles';

// Components
import Authentication from '../authentication/authentication';
import PrimaryAppBar from '../app-bar/primary-app-bar';
import PermanentDrawer from '../drawer/permanent-drawer';
import TemporaryDrawer from '../drawer/temporary-drawer';
import AlertHandler from '../handlers/alert-handler';
import ErrorHandler from '../handlers/error-handler';
import FirebaseScripts from './firebase';
import AlgoliaScripts from './algolia';
import Content from './content';
import Messaging from './messaging';
import SyncQueryParams from './sync-query-params';
import PWA from './pwa';

// Subscriptions
import NotificationsSubscription from '../subscriptions/notifications-subscription';
import PresenceSubscription from '../subscriptions/presence-subscription';
import SettingsSubscription from '../subscriptions/settings-subscription';
import UserSubscription from '../subscriptions/user-subscription';

import './app-shell.css';

export class AppShell extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  get firebase() {
    return firebase;
  }

  componentDidMount() {
    mappedActions.setRouter(this.props.router);
    mappedActions.setPathname(this.props.router.pathname);
    mappedActions.setQuery(this.props.router.query);
  }

  render() {
    const { admin, algolia, children, secure, url } = this.props;
    const title = 'Firebase SSR';

    return (
      <>
        <MetaHead title={title} />
        <FontsHead />
        <AppStyle />
        <Provider store={store}>
          <div className="app-shell">
            <Authentication admin={admin} secure={secure} url={url} />
            <Messaging />
            <SyncQueryParams />
            <PWA />
            <NotificationsSubscription />
            <PresenceSubscription />
            <SettingsSubscription />
            <UserSubscription />
            <AlertHandler />
            <ErrorHandler />
            <PrimaryAppBar title={title} />
            <TemporaryDrawer beforeInstallEvent={this.state.beforeInstallEvent} />
            <Content>
              <div className="permanent-drawer">
                <PermanentDrawer beforeInstallEvent={this.state.beforeInstallEvent} />
              </div>
              <main>{children}</main>
            </Content>
          </div>
        </Provider>
        <FirebaseScripts firebaseEnv={this.state.environment.firebase} />
        {algolia && <AlgoliaScripts />}
      </>
    );
  }
}

export default withRouter(AppShell);
