import React from 'react';
import Paper from '../paper/paper';
import { IconButton } from 'rmwc/IconButton';
import UserDetailCard from '../cards/user-detail-card';

import '@material/icon-button/dist/mdc.icon-button.min.css';

export default function UserDetail({ environment, user, onBack }) {
  return (
    user && (
      <Paper>
        <h6>
          <IconButton onClick={onBack} use="arrow_back" />
        </h6>

        <UserDetailCard environment={environment} user={user} />
      </Paper>
    )
  );
}
