/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../../datastore';

import BaseSubscription from './base-subscription';

import subscribePresense from '../../../database/presense/subscribe-presense';

export class PresenseSubscription extends BaseSubscription {
  get canSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  subscribe() {
    const { currentUser, environment, setPresense } = this.props;

    return subscribePresense({ environment, currentUser }).subscribe(setPresense);
  }
}

export default connect(
  'currentUser,environment',
  actions
)(PresenseSubscription);
