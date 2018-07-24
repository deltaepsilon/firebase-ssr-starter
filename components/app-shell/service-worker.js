/* globals firebase */
import React from 'react';

export default class ServiceWorker extends React.Component {
  get messaging() {
    return firebase.messaging();
  }

  componentDidMount() {
    this.registerServiceWorker();
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
    return null;
  }
}
