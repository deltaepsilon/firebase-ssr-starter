/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUser from '../../database/user/subscribe-user';

export class UserSubscription extends BaseSubscription {
  get auth() {
    return firebase.auth();
  }

  get canSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  subscribe() {
    const { currentUser, environment, setUser } = this.props;

    return subscribeUser({ environment, uid: currentUser.uid }).subscribe(async user => {
      const claimsHaveChanged = user && this.claimsHaveChanged(this.props.user, user);

      setUser(user);

      if (claimsHaveChanged) {
        await this.auth.currentUser.getIdToken(true);

        const { claims } = await this.auth.currentUser.getIdTokenResult();

        this.props.setClaims(claims);
      }
    });
  }

  claimsHaveChanged(oldUser, newUser) {
    const existingKeys = oldUser
      ? Object.keys(oldUser.claims)
          .sort()
          .join()
      : '';
    const newKeys = Object.keys(newUser.claims)
      .sort()
      .join();

    return existingKeys != newKeys;
  }
}

export default connect(
  'currentUser,environment,user',
  actions
)(UserSubscription);
