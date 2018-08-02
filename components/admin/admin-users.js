import React from 'react';
import Paper from '../paper/paper';

import UsersSubscription from '../subscriptions/users-subscription';
import UsersTable from './tables/users-table';

export default class AdminUsers extends React.Component {
  constructor() {
    super();

    this.state = { users: [] };
  }
  render() {
    return (
      <>
        <Paper>
          <UsersSubscription setUsers={users => this.setState({ users })} />
          <UsersTable users={this.state.users} />
        </Paper>
      </>
    );
  }
}
