/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribePushNotifications from '../../database/notifications/subscribe-push-notifications';

export class PushNotificationsSubscription extends React.Component {
  get shouldSubscribe() {
    const { uid } = this.props;

    return !!uid;
  }

  get observable() {
    const { uid, environment } = this.props;

    return subscribePushNotifications({ environment, uid });
  }

  getNext() {
    return event => {
      this.props.setPushNotifications(event);
    };
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="push-notifications-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
      />
    ) : null;
  }
}

export default connect(
  'environment',
  actions
)(PushNotificationsSubscription);
