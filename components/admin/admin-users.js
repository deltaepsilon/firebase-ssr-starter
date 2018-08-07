import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Paper from '../paper/paper';

import SearchBar from '../list/search-bar';
import UsersSubscription from '../subscriptions/users-subscription';
import UsersTable from './tables/users-table';

export class AdminUsers extends React.Component {
  constructor() {
    super();

    const noop = async args => console.log(args);

    this.state = { isSearching: false, searchResults: [], users: [], next: noop, finished: false };
  }

  render() {
    const {
      environment: { algolia },
    } = this.props;

    return (
      <>
        <Paper>
          <UsersSubscription
            onFinished={() => this.setState({ finished: true })}
            onSubscribed={({ next }) => this.setState({ next })}
            setUsers={users => this.setState({ users })}
          />
          <SearchBar
            algolia={algolia}
            index="users"
            onFocus={() => this.setState({ isSearching: true })}
            onBlur={() => this.setState({ isSearching: false })}
            onSearchResults={searchResults => this.setState({ searchResults })}
          />
          <UsersTable
            finished={this.state.finished}
            isSearching={this.state.isSearching}
            next={this.state.next}
            searchResults={this.state.searchResults}
            users={this.state.users}
          />
        </Paper>
      </>
    );
  }
}

export default connect(
  'environment',
  actions
)(AdminUsers);
