/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribePresence from '../../database/presence/subscribe-presence';

export class PresenceSubscription extends React.Component {
  get shouldSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  get observable() {
    const { currentUser, environment } = this.props;

    return subscribePresence({ environment, currentUser });
  }

  componentWillUnmount() {
    this.props.setPresence();
  }

  getNext() {
    return event => {
      this.props.setPresence(event);
    };
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="presense-subscription"
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
