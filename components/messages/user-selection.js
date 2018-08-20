import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import { ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';
import { IconButton } from 'rmwc/IconButton';

import AdminMessageStatsSubscription from '../subscriptions/admin-message-stats-subscription';
import SearchBar from '../list/search-bar';
import InfiniteScrollList from '../list/infinite-scroll-list';
import AccountIcon from '../user/account-icon';

import markRead from '../../utilities/messaging/mark-read';
import setReview from '../../utilities/messaging/set-review';
import extractUserDisplayName from '../../utilities/user/extract-user-display-name';

import '../tables/tables.css';

export class UserSelection extends React.Component {
  constructor() {
    super();

    const noop = async args => console.info(args);

    this.state = {
      activeUser: null,
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

  componentDidUpdate(prevProps) {
    this.setDefaultActiveUser();

    if (prevProps.detailUserId != this.props.detailUserId || !this.state.activeUser) {
      const activeUser = this.items.find(({ __id }) => __id == this.props.detailUserId);

      this.setActiveUser(activeUser);
    }
  }

  setDefaultActiveUser() {
    const { detailUserId } = this.props;

    if (!detailUserId && this.items.length) {
      this.setActiveUser(this.items[0]);
    }
  }

  setActiveUser(activeUser) {
    if (activeUser) {
      this.setState({ activeUser });
      this.props.setActiveUser(activeUser);
      this.props.setDetailUserId(activeUser.__id);
    }
  }

  getMarkRead(environment) {
    return userId => async () => {
      const updatedStats = await markRead(environment, userId);

      this.updateStats(userId, updatedStats);
    };
  }

  getSetReview(environment) {
    return (userId, review) => async () => {
      setReview(environment, userId, review);

      this.updateStats(userId, { review });
    };
  }

  updateStats(userId, updates) {
    const messageStats = [...this.state.messageStats];
    const index = messageStats.findIndex(({ __id }) => __id == userId);
    const stats = messageStats[index];

    messageStats[index] = { __id: userId, ...stats, ...updates };

    this.setState({ messageStats });
  }

  render() {
    const { detailUserId, environment, user } = this.props;
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
            {this.items.map(userStats => (
              <MessageStatsListItem
                isMe={userStats.__id == user.__id}
                selected={userStats.__id == detailUserId}
                key={userStats.__id}
                userStats={userStats}
                getMarkRead={this.getMarkRead(environment)}
                setReview={this.getSetReview(environment)}
                setActiveUser={this.setActiveUser.bind(this)}
              />
            ))}
          </InfiniteScrollList>
        </div>
      </div>
    );
  }
}

export default connect(
  'detailUserId,environment,user',
  actions
)(UserSelection);

function MessageStatsListItem({
  isMe,
  selected,
  userStats,
  getMarkRead,
  setReview,
  setActiveUser,
}) {
  let displayNameHTML = extractUserDisplayName(userStats);
  const count = userStats.count || 0;
  const read = userStats.read || 0;
  const unread = count - read;
  const showUnread = !isMe && unread > 0 && !selected;
  const showMarkRead = !isMe && unread > 0 && selected;
  const showMarkBookmark = !isMe && unread == 0 && !userStats.review && selected;
  const showUnmarkBookmark = !isMe && unread == 0 && userStats.review;

  if (isMe) {
    displayNameHTML += ' (me)';
  }

  return (
    <ListItem onClick={() => setActiveUser(userStats)} selected={selected}>
      <ListItemGraphic>
        <AccountIcon currentUser={userStats} />
      </ListItemGraphic>
      <ListItemText>
        <span className="primary-text" dangerouslySetInnerHTML={{ __html: displayNameHTML }} />
        {showUnread && (
          <span className="icon">
            <aside>{userStats.count}</aside>
            <Icon use="markunread_mailbox" />
          </span>
        )}
      </ListItemText>
      {showMarkRead && <IconButton use="done_outline" onClick={getMarkRead(userStats.__id)} />}
      {showMarkBookmark && (
        <IconButton use="bookmark_border" onClick={setReview(userStats.__id, true)} />
      )}
      {showUnmarkBookmark && (
        <IconButton use="bookmark" onClick={setReview(userStats.__id, false)} />
      )}
    </ListItem>
  );
}
