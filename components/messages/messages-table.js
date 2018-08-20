import React from 'react';

import { ListItem, ListItemText, ListItemSecondaryText, ListItemGraphic } from 'rmwc/List';
import { Button } from "rmwc/Button";

import copyToClipboard from '../../utilities/copy-to-clipboard';

import InfiniteScrollList from '../list/infinite-scroll-list';
import AccountIcon from '../user/account-icon';
import DateTime from '../dates/date-time';
import FromNow from '../dates/from-now';
import Thumbnail from '../images/thumbnail';

import '@material/button/dist/mdc.button.min.css';
import './messages.css';

export default ({ finished, messages, next, scrollTargetIndex, userId }) => {
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
        {messages.map(mapMessage).map((message, i) => (
          <MessageListItem key={i} message={message} isLast={i == 0} isMe={message.uid == userId} />
        ))}
      </InfiniteScrollList>
    </div>
  );
};

function mapMessage(message, i, messages) {
  if (i < messages.length - 1) {
    const messageDate = new Date(message.created);
    const nextMessageDate = new Date(messages[i + 1].created);

    const minutesDifference = Math.floor(
      (messageDate.getTime() - nextMessageDate.getTime()) / 60000
    );

    if (minutesDifference > 5) {
      message.showDate = true;
    }
  } else if (i == messages.length - 1) {
    message.showDate = true;
  }

  return message;
}

class MessageListItem extends React.Component {
  constructor() {
    super();

    this.primaryText = React.createRef();
  }
  handleClick() {
    const { message } = this.props;

    if (message.text) {
      copyToClipboard(message.text || message.url);
    } else if (this.primaryText) {
      this.primaryText.current.querySelector('.thumbnail').click();
    }
  }

  render() {
    const { isLast, isMe, message } = this.props;
    const isTextMessage = !!message.text;
    const typeClass = isTextMessage ? 'text-message' : 'image-message';
    const isMeClass = isMe ? 'is-me' : 'is-not-me';

    return (
      <>
        {message.showDate && (
          <div className="datetime">
            <DateTime datetime={message.created} />
          </div>
        )}
        <ListItem className={`${typeClass} ${isMeClass}`} onClick={this.handleClick.bind(this)}>
          {!isMe && (
            <ListItemGraphic>
              <AccountIcon currentUser={message} />
            </ListItemGraphic>
          )}
          <ListItemText>
            <div className="primary-text" ref={this.primaryText}>
              {message.text || <Thumbnail src={message.url} height="75px" />}
            </div>
            <div className="secondary-text">
              <ListItemSecondaryText>
                {/* <div>{message.displayName}</div> */}
                {isLast && <FromNow datetime={message.created} />}
              </ListItemSecondaryText>
            </div>
          </ListItemText>
        </ListItem>
      </>
    );
  }
}
