import React from 'react';
import Paper from '../paper/paper';

import UsersSubscription from '../subscriptions/users-subscription';
import UsersTable from './tables/users-table';

export default class AdminUsers extends React.Component {
  constructor() {
    super();

    const noop = async args => console.log(args);

    this.state = { users: [], next: noop };
  }

  handleSubscribed({ next }) {
    console.log('next', next);
    debugger
    // this.setState({ next });
  }

  render() {
    return (
      <>
        <Paper>
          <UsersSubscription
            setUsers={users => this.setState({ users })}
            onSubscribed={this.handleSubscribed.bind(this)}
          />
          <UsersTable users={this.state.users} next={this.state.next} />
        </Paper>
      </>
    );
  }
}
