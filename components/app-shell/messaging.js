/* global firebase */
import React, { Component } from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import getToken from '../../utilities/messaging/get-messaging-token';

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
    const messagingToken = await getToken();

    this.props.setMessagingToken(messagingToken);
  }

  showMessage({ text: message, title, url }) {
    this.setState({ message, title, show: true, url });
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
  'currentUser,environment,isDevelopment,presence,router,serviceWorkerRegistered,settings',
  actions
)(Messaging);
