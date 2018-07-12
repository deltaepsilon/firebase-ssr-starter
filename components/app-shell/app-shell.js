import React from 'react';
import { Provider } from 'unistore/react';
import { mappedActions, store } from '../../datastore';
import FirebaseHead from '../head/firebase';
import FontsHead from '../head/fonts';
import { AppStyle } from '../head/styles';

import PrimaryAppBar from '../app-bar/primary';

const style = {
  main: {
    overflow: 'auto',
    marginTop: '4rem',
  },
};

export default class AppShell extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <FirebaseHead firebaseEnv={this.state.environment.firebase} />
        <FontsHead />
        <AppStyle />
        <Provider store={store}>
          <>
            <div>
              <PrimaryAppBar />
            </div>
            <main style={style.main}>{children}</main>
          </>
        </Provider>
      </>
    );
  }
}
