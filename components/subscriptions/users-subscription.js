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

    return subscribeUsers({ environment }).subscribe(
      event => {
        if (event.__id) {
          const user = event;
          this.addItem(user);
          setUsers(this.state.items);
        } else if (event.next) {
          this.props.onSubscribed(next);
        }
      }
    );
  }
}

export default connect(
  'claims,environment',
  actions
)(UsersSubscription);
