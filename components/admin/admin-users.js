import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Paper from '../paper/paper';

import AdminUserSubscription from '../subscriptions/admin-user-subscription';
import SearchBar from '../list/search-bar';
import UserDetail from '../user/user-detail';
import UsersSubscription from '../subscriptions/users-subscription';
import UsersTable from './tables/users-table';
import SetQueryParams from '../url/set-query-params';

export class AdminUsers extends React.Component {
  render() {
    const { adminTabIndex, detailUserId, environment, setDetailUserId } = this.props;

    return (
      <>
        {detailUserId ? (
          <UserView
            adminTabIndex={adminTabIndex}
            detailUserId={detailUserId}
            environment={environment}
            setDetailUserId={setDetailUserId}
          />
        ) : (
          <UsersView
            adminTabIndex={adminTabIndex}
            environment={environment}
            setDetailUserId={setDetailUserId}
          />
        )}
      </>
    );
  }
}

export default connect(
  'adminTabIndex,detailUserId,environment',
  actions
)(AdminUsers);

class UserView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };
  }

  render() {
    const { adminTabIndex, detailUserId, environment, setDetailUserId } = this.props;

    return (
      <>
        <SetQueryParams params={{ adminTabIndex, detailUserId }} />
        <AdminUserSubscription
          environment={environment}
          userId={detailUserId}
          setUser={user => this.setState({ user })}
        />
        <Paper>
          <UserDetail
            adminTabIndex={adminTabIndex}
            environment={environment}
            user={this.state.user}
            onBack={() => setDetailUserId()}
          />
        </Paper>
      </>
    );
  }
}

class UsersView extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      isSearching: false,
      searchResults: [],
      users: [],
      next: noop,
      finished: false,
    };
  }

  handleUserSelection(userId) {
    this.props.setDetailUserId(userId);
  }

  render() {
    const { adminTabIndex, environment } = this.props;

    return (
      <Paper>
        <SetQueryParams params={{ adminTabIndex }} />
        <UsersSubscription
          onFinished={() => this.setState({ finished: true })}
          onSubscribed={({ next }) => this.setState({ next })}
          setUsers={users => this.setState({ users })}
        />
        <SearchBar
          algolia={environment.algolia}
          index="users"
          onFocus={() => this.setState({ isSearching: true })}
          onBlur={() => this.setState({ isSearching: false })}
          onSearchResults={searchResults => this.setState({ searchResults })}
        />
        <UsersTable
          finished={this.state.finished}
          isSearching={this.state.isSearching}
          next={this.state.next}
          onUserSelection={this.handleUserSelection.bind(this)}
          searchResults={this.state.searchResults}
          users={this.state.users}
        />
      </Paper>
    );
  }
}
