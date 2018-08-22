import React from 'react';
import Paper from '../paper/paper';
import { IconButton } from 'rmwc/IconButton';
import UserDetailCard from '../cards/user-detail-card';
import UserPushNotificationsCard from '../cards/user-push-notifications-card';

import './user.css';
import '@material/icon-button/dist/mdc.icon-button.min.css';

export default function UserDetail({ adminTabIndex, environment, user, onBack }) {
  return (
    user && (
      <div className="user">
        <Paper>
          <h6>
            <IconButton onClick={onBack} use="arrow_back" />
          </h6>

          <div className="cards">
            <UserDetailCard adminTabIndex={adminTabIndex} environment={environment} user={user} />
            <UserPushNotificationsCard environment={environment} user={user} />
          </div>
        </Paper>
      </div>
    )
  );
}
