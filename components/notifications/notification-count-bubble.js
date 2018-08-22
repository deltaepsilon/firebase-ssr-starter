import React from 'react';
import { Icon } from 'rmwc/Icon';

import './notifications.css';

export default ({ count }) => {
  return !!count ? (
    <div className="notification-count-bubble">
      <span>{count}</span>
      <Icon use="notifications" />
    </div>
  ) : null;
};
