/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeAdminMessageStats from '../../database/messages/subscribe-admin-message-stats';

export class AdminMessageStatsSubscription extends BaseSubscription {
  get auth() {
    return firebase.auth();
  }

  get canSubscribe() {
    const { claims } = this.props;

    return (claims && claims.isAdmin) || claims.isModerator;
  }

  subscribe() {
    const { environment, setMessageStats } = this.props;

    return subscribeAdminMessageStats({ environment }).subscribe(
      event => {
        if (event.__id) {
          const user = event;
          this.addItem(user);
          setMessageStats(this.state.items);
        } else if (event.next) {
          this.props.onSubscribed(event);
        }
      },
      error => {
        throw new HandledError(error);
      },
      () => this.props.onFinished()
    );
  }
}

export default connect(
  'claims,environment',
  actions
)(AdminMessageStatsSubscription);
