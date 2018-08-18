/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUsers from '../../database/users/subscribe-users';

export class UsersSubscription extends React.Component {
  get auth() {
    return firebase.auth();
  }

  get shouldSubscribe() {
    const { claims } = this.props;

    return (claims && claims.isAdmin) || claims.isModerator;
  }

  get observable() {
    const { environment } = this.props;

    return subscribeUsers({ environment });
  }

  getNext({ addItem }) {
    const { onSubscribed, setUsers } = this.props;

    return event => {
      if (event.__id) {
        const items = addItem(event);
        setUsers(items);
      } else if (event.next) {
        onSubscribed(event);
      }
    };
  }

  getFinished() {
    return this.props.onFinished;
  }

  render() {
    return (
      this.shouldSubscribe && (
        <BaseSubscription
          name="users-subscription"
          getFinished={this.getFinished.bind(this)}
          getNext={this.getNext.bind(this)}
          observable={this.observable}
        />
      )
    );
  }
}

export default connect(
  'claims,environment',
  actions
)(UsersSubscription);
