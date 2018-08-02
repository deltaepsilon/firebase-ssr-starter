/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUsers from '../../database/users/subscribe-users';

export class UsersSubscription extends BaseSubscription {
  get auth() {
    return firebase.auth();
  }

  get canSubscribe() {
    const { claims } = this.props;

    return (claims && claims.isAdmin) || claims.isModerator;
  }

  subscribe() {
    const { environment, setUsers } = this.props;

    return subscribeUsers({ environment }).subscribe(user => {
      this.addItem(user);
      setUsers(this.state.items);
    });
  }
}

export default connect(
  'claims,environment',
  actions
)(UsersSubscription);
