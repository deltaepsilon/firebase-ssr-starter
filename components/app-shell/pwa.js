import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

export class Pwa extends React.Component {
  componentDidMount() {
    this.beforeInstallPrompt = e => {
      e.preventDefault();

      this.props.setBeforeInstallEvent(e);
    };

    window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.beforeInstallPrompt);
  }

  render() {
    return null;
  }
}

export default connect(
  '',
  actions
)(Pwa);
