/* globals window, document */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Link from 'next/link';
import Paper from '../paper/paper';

import IconButton from 'rmwc/IconButton';

import SetQueryParams from '../url/set-query-params';
import AddUserMessage from '../../database/messages/add-user-message';
import extractUserDisplayName from '../../utilities/user/extract-user-display-name';
import extractUserPhotoUrl from '../../utilities/user/extract-user-photo-url';
import extractUserEmail from '../../utilities/user/extract-user-email';

import UserSelection from './user-selection';
import UserMessagesSubscription from '../subscriptions/user-messages-subscription';
import MessagesTable from './messages-table';
import MessageForm from './message-form';

import './messages.css';

export class ModeratorMessages extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      activeUser: null,
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
    const { environment, detailUserId } = this.props;

    return AddUserMessage({ environment, uid: detailUserId });
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
    const { detailUserId, environment, user } = this.props;
    const { activeUser } = this.state;

    return (
      <>
        <SetQueryParams params={{ detailUserId }} />

        <UserMessagesSubscription
          environment={environment}
          userId={detailUserId}
          onFinished={() => this.setState({ finished: true })}
          onSubscribed={({ next }) => this.setState({ next })}
          setUserMessages={this.handleUserMessages.bind(this)}
        />

        <div className="moderator-messages user-messages">
          <UserSelection
            setActiveUser={activeUser => this.setState({ activeUser, userMessages: [] })}
          />
          <Paper>
            <div className="wrapper">
              {activeUser && (
                <div className="header">
                  <div>
                    <h2 className="title">{activeUser.displayName}</h2>
                    <span className="secondary">{activeUser.email}</span>
                  </div>
                  <Link href={`/admin?adminTabIndex=1&detailUserId=${detailUserId}`} prefetch>
                    <a>
                      <IconButton use="arrow_forward" />
                    </a>
                  </Link>
                </div>
              )}

              <MessagesTable
                finished={this.state.finished}
                next={this.state.next}
                messages={this.state.userMessages}
                showMarkRead
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
  'detailUserId,environment,user',
  actions
)(ModeratorMessages);

function getLastIndexByPage(items, page) {
  return items.map(item => item.__page).lastIndexOf(page);
}
