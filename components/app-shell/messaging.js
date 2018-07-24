/* global firebase */
import React, { Component } from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

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
    let messagingToken;
    try {
      await this.messaging.requestPermission();

      messagingToken = await this.messaging.getToken();
    } catch (e) {
      alert(
        'Unblock notifications to enable. See https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en'
      );
    }

    this.props.setMessagingToken(messagingToken);
  }

  showMessage({ message, noteId }) {
    this.setState({ message, noteId, title: 'Visit', show: true });
  }

  async registerServiceWorker() {
    const swFilename = this.props.isDevelopment ? 'sw.dev.js' : 'sw.prod.js';
    const filepath = `/static/scripts/${swFilename}`;

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register(filepath);
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
  'isDevelopment,router',
  actions
)(Messaging);
