/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribePresence from '../../database/presence/subscribe-presence';

export class PresenceSubscription extends BaseSubscription {
  get canSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  subscribe() {
    const { currentUser, environment, setPresence } = this.props;

    return subscribePresence({ environment, currentUser }).subscribe(setPresence);
  }
}

export default connect(
  'currentUser,environment',
  actions
)(PresenceSubscription);
