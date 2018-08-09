/* global firebase */
import React, { Component } from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import getToken from '../../utilities/messaging/get-token';

import { Snackbar } from 'rmwc/Snackbar';

export class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get messaging() {
    return firebase.messaging();
  }

  async componentDidMount() {
    await this.registerServiceWorker();

    this.unlistenOnTokenRefresh = this.messaging.onTokenRefresh(() => this.getToken());

    this.unlistenOnMessage = this.messaging.onMessage(payload => this.showMessage(payload.data));
  }

  componentWillUnmount() {
    this.unlistenOnTokenRefresh && this.unlistenOnTokenRefresh();
    this.unlistenOnMessage && this.unlistenOnMessage();
  }

  async getToken() {
    const { currentUser, setMessagingToken } = this.props;
    const uid = currentUser.uid;
    
    return getToken({ uid, setMessagingToken })();
  }

  showMessage({ message, noteId }) {
    this.setState({ message, noteId, title: 'Visit', show: true });
  }

  async registerServiceWorker() {
    const swFilename = this.props.isDevelopment ? 'sw.dev.js' : 'sw.js';
    const filepath = `/${swFilename}`;

    if ('serviceWorker' in navigator && !this.props.serviceWorkerRegistered) {
      this.props.setServiceWorkerRegistered();
      const registration = await navigator.serviceWorker.register(filepath, { scope: '/' });
      this.messaging.useServiceWorker(registration);
    }
  }

  render() {
    const { router } = this.props;
    const { message, url, show, title } = this.state;

    return (
      <div>
        <Snackbar
          show={show}
          onHide={e => this.setState({ show: false })}
          message={message}
          actionText={title}
          actionHandler={() => router.push(url)}
        />
      </div>
    );
  }
}

export default connect(
  'currentUser,isDevelopment,router,serviceWorkerRegistered',
  actions
)(Messaging);
