/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeNotifications from '../../database/notifications/subscribe-notifications';

export class NotificationsSubscription extends React.Component {
  get shouldSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  get observable() {
    const { currentUser, environment } = this.props;

    return subscribeNotifications({ environment, currentUser });
  }

  getNext() {
    return event => {
      this.props.setNotifications(event);
    };
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="notifications-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
      />
    ) : null;
  }
}

export default connect(
  'currentUser,environment',
  actions
)(NotificationsSubscription);
