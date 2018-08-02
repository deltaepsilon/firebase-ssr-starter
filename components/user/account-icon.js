import React from 'react';
import md5 from 'md5';
import { Icon } from 'rmwc/Icon';

import './account-icon.css';

export default function AccountIcon({ currentUser }) {
  let accountIcon = <Icon use="account_circle" />;

  if (currentUser) {
    if (currentUser.photoURL) {
      accountIcon = <Icon strategy="url" use={currentUser.photoURL} />;
    } else if (currentUser.email) {
      accountIcon = (
        <Icon strategy="url" use={`https://www.gravatar.com/avatar/${md5(currentUser.email)}`} />
      );
    }
  }

  return <div className="account-icon">{accountIcon}</div>;
}
