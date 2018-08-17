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
    const { userId } = this.props;

    return !!userId;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId != this.state.prevUserId) {
      this.setState({ prevUserId: prevProps.userId });
    }

    this.attemptSubscription();
  }

  shouldUpdate() {
    const { userId } = this.props;
    const { prevUserId } = this.state;

    return !this.subscription || (prevUserId && prevUserId != userId);
  }

  subscribe() {
    const { environment, userId, setUserMessages } = this.props;

    this.setState({ items: [] });

    console.log('subscribing', this.state.items.length);

    return subscribeUserMessages({ environment, uid: userId }).subscribe(
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
  'environment',
  actions
)(UserMessagesSubscription);
