import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import { ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';

import AdminMessageStatsSubscription from '../subscriptions/admin-message-stats-subscription';
import SearchBar from '../list/search-bar';
import InfiniteScrollList from '../list/infinite-scroll-list';
import AccountIcon from '../user/account-icon';

import extractUserDisplayName from '../../utilities/user/extract-user-display-name';

import '../tables/tables.css';

export class UserSelection extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      isSearching: false,
      searchResults: [],
      messageStats: [],
      next: noop,
      finished: false,
    };
  }

  get items() {
    const { searchResults, messageStats } = this.state;
    const hasSearchResults = !!searchResults.length;
    return hasSearchResults ? searchResults : messageStats;
  }

  componentDidUpdate() {
    const { detailUserId, setDetailUserId } = this.props;
    if (!detailUserId && this.items.length) {
      setDetailUserId(this.items[0].__id);
    }
  }

  render() {
    const { detailUserId, environment, setDetailUserId } = this.props;
    const { finished, next, searchResults } = this.state;
    const hasSearchResults = !!searchResults.length;

    return (
      <div className="user-selection">
        <AdminMessageStatsSubscription
          onFinished={() => this.setState({ finished: true })}
          onSubscribed={({ next }) => this.setState({ next })}
          setMessageStats={messageStats => this.setState({ messageStats })}
        />
        <SearchBar
          algolia={environment.algolia}
          index="users"
          onFocus={() => this.setState({ isSearching: true })}
          onBlur={() => this.setState({ isSearching: false })}
          onSearchResults={searchResults => this.setState({ searchResults })}
        />

        <div className="table">
          <InfiniteScrollList
            isFinished={hasSearchResults || finished}
            name="user-selection-table"
            next={next}
          >
            {this.items.map((userStats, i) => (
              <MessageStatsListItem
                selected={userStats.__id == detailUserId}
                key={userStats.__id}
                userStats={userStats}
                setDetailUserId={setDetailUserId}
              />
            ))}
          </InfiniteScrollList>
        </div>
      </div>
    );
  }
}

export default connect(
  'detailUserId,environment',
  actions
)(UserSelection);

function MessageStatsListItem({ selected, userStats, setDetailUserId }) {
  const displayNameHTML = extractUserDisplayName(userStats);
  const totalMessages = userStats.count || 0;
  const readMessages = userStats.read || 0;
  const unread = totalMessages - readMessages;

  return (
    <ListItem onClick={() => setDetailUserId(userStats.__id)} selected={selected}>
      <ListItemGraphic>
        <AccountIcon currentUser={userStats} />
      </ListItemGraphic>
      <ListItemText>
        <span className="primary-text" dangerouslySetInnerHTML={{ __html: displayNameHTML }} />
        {unread > 0 && (
          <span className="icon">
            <aside>{userStats.count}</aside>
            <Icon use="markunread_mailbox" />
          </span>
        )}
      </ListItemText>
    </ListItem>
  );
}
