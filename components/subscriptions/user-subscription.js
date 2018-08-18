/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUser from '../../database/user/subscribe-user';

export class UserSubscription extends React.Component {
  get observable() {
    const { currentUser, environment } = this.props;

    return currentUser && currentUser.uid && subscribeUser({ environment, uid: currentUser.uid });
  }

  get auth() {
    return firebase.auth();
  }

  get shouldSubscribe() {
    const { currentUser } = this.props;

    return !!currentUser && !!currentUser.uid;
  }

  getNext() {
    const { setClaims, setUser } = this.props;

    return async user => {
      const claimsHaveChanged = user && this.claimsHaveChanged(this.props.user, user);

      setUser(user);

      if (claimsHaveChanged) {
        await this.auth.currentUser.getIdToken(true);

        const { claims } = await this.auth.currentUser.getIdTokenResult();

        setClaims(claims);
      }
    };
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

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="user-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
      />
    ) : null;
  }
}

export default connect(
  'currentUser,environment,user',
  actions
)(UserSubscription);
