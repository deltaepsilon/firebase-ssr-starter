/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeSettings from '../../database/settings/subscribe-settings';

export class PresenceSubscription extends React.Component {
  get shouldSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  get observable() {
    const { currentUser, environment } = this.props;

    return subscribeSettings({ environment, uid: currentUser.uid });
  }

  getNext() {
    return this.props.setSettings;
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="settings-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
      />
    ) : null;
  }
}

export default connect(
  'currentUser,environment',
  actions
)(PresenceSubscription);
