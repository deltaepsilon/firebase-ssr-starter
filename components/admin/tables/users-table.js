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
import extractUserDisplayName from "../../../utilities/user/extract-user-display-name";
import extractUserEmail from "../../../utilities/user/extract-user-email";

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
  let email = extractUserEmail(user);
  let displayName = extractUserDisplayName(user)
  

  return (
    <ListItem onClick={() => onUserSelection(user.__id)}>
      <ListItemGraphic>
        <AccountIcon currentUser={user} />
      </ListItemGraphic>
      <ListItemText>
        <span dangerouslySetInnerHTML={{ __html: email }} />

        <span>
          <ListItemSecondaryText>
            <span dangerouslySetInnerHTML={{ __html: displayName }} />
            <span className="flex" />
            {user.lastSignInTime && <FromNow datetime={user.lastSignInTime} />}
          </ListItemSecondaryText>
        </span>
      </ListItemText>

      {/* <ListItemMeta>info</ListItemMeta> */}
    </ListItem>
  );
}
