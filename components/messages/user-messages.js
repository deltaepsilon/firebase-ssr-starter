import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Paper from '../paper/paper';

import AddUserMessage from '../../database/messages/add-user-message';

import UserMessagesSubscription from '../subscriptions/user-messages-subscription';
import MessagesTable from './messages-table';
import MessageForm from './message-form';

import './messages.css';

export class UserMessages extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      next: noop,
      userMessages: [],
    };
  }
  render() {
    const { environment, user } = this.props;
    const addUserMessage = AddUserMessage({ environment, uid: user.__id });

    return (
      <>
        <UserMessagesSubscription
          environment={environment}
          userId={user.__id}
          onSubscribed={({ next }) => this.setState({ next })}
          setUserMessages={userMessages => this.setState({ userMessages })}
        />
        <div className="user-messages">
          <Paper>
            <h1>Messages</h1>

            <hr />

            <div className="wrapper">
              <MessagesTable messages={this.state.userMessages} />

              <MessageForm user={user} onMessage={addUserMessage} />
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
