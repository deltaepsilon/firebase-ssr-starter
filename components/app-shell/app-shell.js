import React from 'react';
import { Provider } from 'unistore/react';
import { store } from '../../datastore';
import FirebaseHead from '../head/firebase';
import FontsHead from '../head/fonts';
import { AppStyle } from '../head/styles';

import Authentication from '../authentication/authentication';
import PrimaryAppBar from '../app-bar/primary-app-bar';
import PermanentDrawer from '../drawer/permanent-drawer';
import TemporaryDrawer from '../drawer/temporary-drawer';

import './app-shell.css';

export default class AppShell extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  render() {
    const { children, secure, url } = this.props;
    return (
      <>
        <FirebaseHead firebaseEnv={this.state.environment.firebase} />
        <FontsHead />
        <AppStyle />
        <Provider store={store}>
          <div className="app-shell">
            <Authentication url={url} secure={secure} />
            <PrimaryAppBar />
            <TemporaryDrawer />
            <div className="content">
              <div className="permanent-drawer">
                <PermanentDrawer />
              </div>
              <main>{children}</main>
            </div>
          </div>
        </Provider>
      </>
    );
  }
}
