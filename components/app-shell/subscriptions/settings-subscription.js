/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../../datastore';

import BaseSubscription from './base-subscription';

import subscribeSettings from '../../../database/settings/subscribe-settings';

export class PresenseSubscription extends BaseSubscription {
  get canSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  subscribe() {
    const { currentUser, environment, setSettings } = this.props;

    return subscribeSettings({ environment, uid: currentUser.uid }).subscribe(setSettings);
  }
}

export default connect(
  'currentUser,environment',
  actions
)(PresenseSubscription);
