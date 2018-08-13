/* globals firebase */
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUserMessages from '../../database/messages/subscribe-user-messages';

export class UserMessagesSubscription extends BaseSubscription {
  get auth() {
    return firebase.auth();
  }

  get canSubscribe() {
    const { user } = this.props;

    return user && user.__id;
  }

  subscribe() {
    const { environment, user, setUserMessages } = this.props;

    return subscribeUserMessages({ environment, uid: user.__id }).subscribe(
      event => {
        if (event.__id) {
          const message = event;
          this.addItem(message);
          setUserMessages(this.state.items);
        } else if (event.next) {
          this.props.onSubscribed(event);
        } else if (event.finished) {
          this.props.onFinished();
        }
      },
      error => {
        throw new HandledError(error);
      }
    );
  }
}

export default connect(
  'user,environment',
  actions
)(UserMessagesSubscription);
