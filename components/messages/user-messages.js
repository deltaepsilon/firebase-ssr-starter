import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Paper from '../paper/paper';

import AddUserMessage from '../../database/messages/add-user-message';
import extractUserDisplayName from '../../utilities/user/extract-user-display-name';
import extractUserPhotoUrl from '../../utilities/user/extract-user-photo-url';

import UserMessagesSubscription from '../subscriptions/user-messages-subscription';
import MessagesTable from './messages-table';
import MessageForm from './message-form';

import './messages.css';
import extractUserEmail from '../../utilities/user/extract-user-email';

export class UserMessages extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      autoScroll: false,
      finished: false,
      next: noop,
      userMessages: [],
    };
  }

  get debounceMillis() {
    return 1000 * 0.2;
  }

  async sendMessage(text) {
    const { environment, user } = this.props;
    const uid = user.__id;
    const addUserMessage = AddUserMessage({ environment, uid });
    const message = {
      created: Date.now(),
      displayName: extractUserDisplayName(user),
      email: extractUserEmail(user),
      photoUrl: extractUserPhotoUrl(user),
      text,
      uid,
    };

    return addUserMessage(message);
  }

  handleUserMessages(userMessages) {
    this.debounce(() => {
      this.setState({ autoScroll: true });

      this.debounce(() => this.setState({ autoScroll: false }));
    });

    this.setState({ userMessages });
  }

  debounce(fn) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => fn(), this.debounceMillis);
  }

  render() {
    const { environment, user } = this.props;

    return (
      <>
        <UserMessagesSubscription
          environment={environment}
          userId={user.__id}
          onFinished={() => this.setState({ finished: true })}
          onSubscribed={({ next }) => this.setState({ next })}
          setUserMessages={this.handleUserMessages.bind(this)}
        />
        <div className="user-messages">
          <Paper>
            <h1>Messages</h1>

            <hr />

            <div className="wrapper">
              <MessagesTable
                autoScroll={this.state.autoScroll}
                finished={this.state.finished}
                messages={this.state.userMessages}
              />

              <MessageForm
                user={user}
                onMessage={this.sendMessage.bind(this)}
                next={this.state.next}
              />
            </div>
          </Paper>
        </div>
      </>
    );
  }
}

export default connect(
  'environment,user',
  actions
)(UserMessages);
