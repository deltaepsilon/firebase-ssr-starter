/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../../datastore';

import subscribeSettings from '../../../database/settings/subscribe-settings';

export class SettingsSubscription extends React.Component {
  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    const { currentUser, environment, setSettings } = this.props;

    if (!this.subscription && currentUser && currentUser.uid) {
      this.subscription = subscribeSettings({ environment, uid: currentUser.uid }).subscribe(
        setSettings
      );
    } else {
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
    this.subscription = null;
  }

  render() {
    return null;
  }
}

export default connect(
  'currentUser,environment',
  actions
)(SettingsSubscription);
