/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../../datastore';

import subscribeSettings from '../../../database/settings/subscribe-settings';

export class SettingsSubscription extends React.Component {
  componentDidMount() {
    const {
      currentUser: { uid },
      environment,
      setSettings,
    } = this.props;

    this.subscription = subscribeSettings({ environment, uid }).subscribe(setSettings);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return null;
  }
}

export default connect(
  'currentUser,environment',
  actions
)(SettingsSubscription);
