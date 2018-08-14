import React from 'react';

import { ListItem, ListItemText, ListItemSecondaryText, ListItemGraphic } from 'rmwc/List';

import InfiniteScrollList from '../list/infinite-scroll-list';
import AccountIcon from '../user/account-icon';
import FromNow from '../dates/from-now';

import './messages.css';

export default ({ finished, messages, next, scrollTargetIndex }) => {
  return (
    <div className="table">
      <InfiniteScrollList
        autoScroll
        inverseScroll
        isFinished={finished}
        name="messages-table"
        next={next}
        scrollTargetIndex={scrollTargetIndex}
      >
        {messages.map(message => (
          <MessageListItem key={message.__id} message={message} />
        ))}
      </InfiniteScrollList>
    </div>
  );
};

function MessageListItem({ message }) {
  return (
    <ListItem>
      <ListItemGraphic>
        <AccountIcon currentUser={message} />
      </ListItemGraphic>
      <ListItemText>
        <span className="primary-text">{message.text}</span>
        <span className="secondary-text">
          <ListItemSecondaryText>
            <span>{message.displayName}</span>
            <FromNow datetime={message.created} />
          </ListItemSecondaryText>
        </span>
      </ListItemText>
    </ListItem>
  );
}
