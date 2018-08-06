import React from 'react';
import Paper from '../paper/paper';

import UsersSubscription from '../subscriptions/users-subscription';
import UsersTable from './tables/users-table';

export default class AdminUsers extends React.Component {
  constructor() {
    super();

    const noop = async args => console.log(args);

    this.state = { users: [], next: noop, finished: false };
  }

  render() {
    return (
      <>
        <Paper>
          <UsersSubscription
            onFinished={() => this.setState({ finished: true })}
            onSubscribed={({ next }) => this.setState({ next })}
            setUsers={users => this.setState({ users })}
          />
          <UsersTable
            users={this.state.users}
            next={this.state.next}
            finished={this.state.finished}
          />
        </Paper>
      </>
    );
  }
}
