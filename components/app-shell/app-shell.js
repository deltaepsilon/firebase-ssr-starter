import React from 'react';
import { withRouter } from 'next/router';
import { Provider } from 'unistore/react';
import { mappedActions, store } from '../../datastore';
import FirebaseHead from '../head/firebase';
import FontsHead from '../head/fonts';
import MetaHead from '../head/meta';
import { AppStyle } from '../head/styles';

import Authentication from '../authentication/authentication';
import PrimaryAppBar from '../app-bar/primary-app-bar';
import PermanentDrawer from '../drawer/permanent-drawer';
import TemporaryDrawer from '../drawer/temporary-drawer';
import ErrorHandler from '../error-handler/error-handler';

import './app-shell.css';

export class AppShell extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    mappedActions.setRouter(this.props.router);
  }

  render() {
    const { children, secure, url } = this.props;
    const title = 'Firebase SSR';

    return (
      <>
        <MetaHead title={title} />
        <FirebaseHead firebaseEnv={this.state.environment.firebase} />
        <FontsHead />
        <AppStyle />
        <Provider store={store}>
          <div className="app-shell">
            <Authentication url={url} secure={secure} />
            <ErrorHandler />
            <PrimaryAppBar title={title} />
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

export default withRouter(AppShell);
