/* globals location */
import React from 'react';
import Link from 'next/link';
import { Card, CardPrimaryAction, CardAction, CardActions } from 'rmwc/Card';

import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';

import PushNotificationsSubscription from '../subscriptions/push-notifications-subscription';
import SixteenByNine from './sixteen-by-nine';
import FromNow from '../dates/from-now';
import SaveableTextField from '../form/saveable-text-field';

import addPushNotification from '../../database/notifications/add-push-notification';

import './card.css';
import '@material/card/dist/mdc.card.min.css';

export default class UserPushNotificationsCard extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  handleSave({ environment, user }) {
    return text =>
      addPushNotification({
        environment,
        uid: user.__id,
        type: environment.notifications.ADMIN,
        detail: {
          text,
          title: 'View',
          url: `${location.origin}/app/messages`,
        },
      });
  }

  render() {
    const { environment, user } = this.props;
    const { items } = this.state;
    const recordLink = `${
      environment.firebase.databaseURL
    }/project/fir-ssr-starter/database/fir-ssr-starter/data/push-notifications/${user.__id}`;

    return (
      <div className="user-push-notifications-card">
        {user && (
          <PushNotificationsSubscription
            uid={user.__id}
            setPushNotifications={items => this.setState({ items })}
          />
        )}
        <Card style={{ width: '21rem', maxWidth: 'calc(100vw - 4rem)' }}>
          <CardPrimaryAction>
            <SixteenByNine centered>
              <Icon use="notifications" style={{ fontSize: '8rem' }} />
            </SixteenByNine>
            <section className="justified">
              <Typography
                className="flex"
                use="subtitle2"
                tag="h3"
                theme="text-secondary-on-background"
              >
                <span> Push Notifications</span>
              </Typography>
              <a href={recordLink} target="_blank">
                record
              </a>
            </section>

            <section>
              <ul>
                {items.map(item => (
                  <NotificationRow key={item.__id} notification={item} />
                ))}
              </ul>
            </section>
          </CardPrimaryAction>
          <CardActions>
            <SaveableTextField
              clearOnSave
              icon="send"
              label="Add notification"
              onSave={this.handleSave({ environment, user })}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

function NotificationRow({ notification }) {
  return (
    <li>
      {notification.type}: {notification.detail.text}
    </li>
  );
}
