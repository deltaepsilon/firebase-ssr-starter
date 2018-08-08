/* globals firebase */

import BaseSubscription from './base-subscription';

import subscribeUser from '../../database/user/subscribe-user';

export default class AdminUserSubscription extends BaseSubscription {
  get canSubscribe() {
    const { userId } = this.props;

    return !!userId;
  }

  subscribe() {
    const { environment, userId, setUser } = this.props;

    return subscribeUser({ environment, uid: userId }).subscribe(setUser);
  }
}
