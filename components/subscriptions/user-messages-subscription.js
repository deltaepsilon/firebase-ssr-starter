/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import BaseSubscription from './base-subscription';

import subscribeUserMessages from '../../database/messages/subscribe-user-messages';

export class UserMessagesSubscription extends React.Component {
  constructor() {
    super();

    this.state = {
      prevUserId: null,
    };
  }

  get observable() {
    const { environment, userId } = this.props;

    return subscribeUserMessages({ environment, uid: userId });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId != this.state.prevUserId) {
      this.setState({ prevUserId: prevProps.userId });
    }
  }

  get shouldSubscribe() {
    return !!this.props.userId;
  }

  getNext({ addItem }) {
    const { onFinished, onSubscribed, setUserMessages } = this.props;

    return event => {
      if (event.__id) {
        const items = addItem(event);

        setUserMessages(items);
      } else if (event.next) {
        onSubscribed(event);
      } else if (event.finished) {
        onFinished();
      }
    };
  }

  render() {
    return this.shouldSubscribe ? (
      <BaseSubscription
        name="user-messages-subscription"
        getNext={this.getNext.bind(this)}
        observable={this.observable}
        identifier={this.props.userId}
      />
    ) : null;
  }
}

export default connect(
  'environment',
  actions
)(UserMessagesSubscription);
