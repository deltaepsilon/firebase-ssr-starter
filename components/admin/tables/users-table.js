import React from 'react';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
} from 'rmwc/List';

import InfiniteScrollList from '../../list/infinite-scroll-list';
import AccountIcon from '../../user/account-icon';
import FromNow from '../../dates/from-now';

import '../../tables/tables.css';
import '@material/list/dist/mdc.list.min.css';

export default function UsersTable({ finished, searchResults, users, next, onUserSelection }) {
  const hasSearchResults = !!searchResults.length;
  const items = hasSearchResults ? searchResults : users;

  return (
    <div className="table">
      <InfiniteScrollList isFinished={hasSearchResults || finished} next={next}>
        {items.map(user => (
          <UserListItem key={user.__id} user={user} onUserSelection={onUserSelection} />
        ))}
      </InfiniteScrollList>
    </div>
  );
}

function UserListItem({ user, onUserSelection }) {
  const isSearch = !!user._highlightResult;
  let email = isSearch ? user._highlightResult.email.value : user.email;
  let displayName =
    isSearch &&
    user._highlightResult.firstProvider &&
    user._highlightResult.firstProvider.displayName
      ? user._highlightResult.firstProvider.displayName.value
      : user.providerData && user.providerData[0] && user.providerData[0].displayName;

  return (
    <ListItem onClick={() => onUserSelection(user.__id)}>
      <ListItemGraphic>
        <AccountIcon currentUser={user} />
      </ListItemGraphic>
      <ListItemText>
        {isSearch ? <span dangerouslySetInnerHTML={{ __html: email }} /> : <span>{email}</span>}

        <span>
          <ListItemSecondaryText>
            {isSearch ? (
              <span dangerouslySetInnerHTML={{ __html: displayName }} />
            ) : (
              <span>{displayName}</span>
            )}
            <span className="flex" />
            {user.lastSignInTime && <FromNow datetime={user.lastSignInTime} />}
          </ListItemSecondaryText>
        </span>
      </ListItemText>

      {/* <ListItemMeta>info</ListItemMeta> */}
    </ListItem>
  );
}
