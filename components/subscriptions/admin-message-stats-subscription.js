/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeAdminMessageStats from '../../database/messages/subscribe-admin-message-stats';

export class AdminMessageStatsSubscription extends React.Component {
  get auth() {
    return firebase.auth();
  }

  get observable() {
    const { environment, setMessageStats } = this.props;

    return subscribeAdminMessageStats({ environment });
  }

  get shouldSubscribe() {
    const { claims } = this.props;

    return claims ? claims.isAdmin || claims.isModerator : false;
  }

  getNext({ addItem }) {
    const { onSubscribed, setMessageStats } = this.props;

    return event => {
      if (event.__id) {
        const items = addItem(event);
        setMessageStats(items);
      } else if (event.next) {
        onSubscribed(event);
      }
    };
  }

  getFinished() {
    return this.props.onFinished;
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="admin-message-stats-subscription"
        getFinished={this.getFinished.bind(this)}
        getNext={this.getNext.bind(this)}
        observable={this.observable}
        onItemsChanged={this.props.setMessageStats}
      />
    ) : null;
  }
}

export default connect(
  'claims,environment',
  actions
)(AdminMessageStatsSubscription);
