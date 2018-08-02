import React from 'react';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
} from 'rmwc/List';

import InfiniteScrollList from '../../lists/infinite-scroll-list';
import AccountIcon from '../../user/account-icon';
import FromNow from '../../dates/from-now';

import '@material/list/dist/mdc.list.min.css';

export default function UsersTable({ users, next }) {
  return (
    <>
      <InfiniteScrollList next={next}>
        {users.map(user => <UserListItem key={user.__id} user={user} />)}
      </InfiniteScrollList>
    </>
  );
}

function UserListItem({ user }) {
  return (
    <ListItem>
      <ListItemGraphic>
        <AccountIcon currentUser={user} />
      </ListItemGraphic>
      <ListItemText>
        <span>{user.email}</span>
        <span>
          <ListItemSecondaryText>
            last login: <FromNow datetime={user.lastSignInTime} />
          </ListItemSecondaryText>
        </span>
      </ListItemText>

      {/* <ListItemMeta>info</ListItemMeta> */}
    </ListItem>
  );
}
