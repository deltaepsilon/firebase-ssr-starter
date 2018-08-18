/* globals firebase */
import React from 'react';
import BaseSubscription from './base-subscription';

import subscribeUser from '../../database/user/subscribe-user';

export default class AdminUserSubscription extends React.Component {
  get shouldSubscribe() {
    const { userId } = this.props;

    return !!userId;
  }

  get observable() {
    const { environment, userId } = this.props;

    return subscribeUser({ environment, uid: userId });
  }

  getNext() {
    return this.props.setUser;
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="admin-user-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
      />
    ) : null;
  }
}
