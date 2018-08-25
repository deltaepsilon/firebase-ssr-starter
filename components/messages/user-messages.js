import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Paper from '../paper/paper';

import AddUserMessage from '../../database/messages/add-user-message';
import extractUserDisplayName from '../../utilities/user/extract-user-display-name';
import extractUserPhotoUrl from '../../utilities/user/extract-user-photo-url';

import UserMessagesSubscription from '../subscriptions/user-messages-subscription';
import AcknowledgeNotifications from '../notifications/acknowledge-notifications';
import MessagesTable from './messages-table';
import MessageForm from './message-form';

import './messages.css';
import extractUserEmail from '../../utilities/user/extract-user-email';

export class UserMessages extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      finished: false,
      next: noop,
      scrollTargetIndex: 0,
      userMessages: [],
    };
  }

  get debounceMillis() {
    return 1000 * 0;
  }

  get addUserMessage() {
    const { environment, user } = this.props;
    const uid = user.__id;
    return AddUserMessage({ environment, uid });
  }

  async sendMessage(text) {
    const userMessage = this.getUserMessage();
    const message = { ...userMessage, text };

    return this.addUserMessage(message);
  }

  async sendUpload({ path, url }) {
    const userMessage = this.getUserMessage();
    const message = { ...userMessage, path, url };

    return this.addUserMessage(message);
  }

  getUserMessage() {
    const { user } = this.props;
    return {
      created: Date.now(),
      displayName: extractUserDisplayName(user),
      email: extractUserEmail(user),
      photoURL: extractUserPhotoUrl(user),
      uid: user.__id,
    };
  }

  handleUserMessages(userMessages) {
    this.debounce(() => {
      const first = userMessages[0];
      const last = userMessages[userMessages.length - 1];
      const isNewPage = !!last && first.__page < last.__page;
      const scrollTargetIndex = isNewPage ? getLastIndexByPage(userMessages, last.__page - 1) : 0;

      this.setState({ scrollTargetIndex });
      this.setState({ userMessages });
    });
  }

  debounce(fn) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => fn(), this.debounceMillis);
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const { environment, user } = this.props;

    return (
      <>
        {user.__id && (
          <UserMessagesSubscription
            environment={environment}
            userId={user.__id}
            onFinished={() => this.setState({ finished: true })}
            onSubscribed={({ next }) => this.setState({ next })}
            setUserMessages={this.handleUserMessages.bind(this)}
          />
        )}
        <AcknowledgeNotifications type={environment.notifications.MESSAGE} />
        <div className="user-messages">
          <Paper>
            <div className="wrapper">
              <MessagesTable
                finished={this.state.finished}
                next={this.state.next}
                messages={this.state.userMessages}
                scrollTargetIndex={this.state.scrollTargetIndex}
                userId={user.__id}
              />

              <MessageForm
                user={user}
                onBlur={this.scrollToTop.bind(this)}
                onFocus={this.scrollToBottom.bind(this)}
                onMessage={this.sendMessage.bind(this)}
                onUpload={this.sendUpload.bind(this)}
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

function getLastIndexByPage(items, page) {
  return items.map(item => item.__page).lastIndexOf(page);
}
