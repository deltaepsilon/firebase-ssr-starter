import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import acknowledgeNotificationsByUserAndType from '../../database/notifications/acknowledge-notifications-by-user-and-type';

export class AcknowledgeNotifications extends React.Component {
  async componentDidMount() {
    const { currentUser, environment, type } = this.props;

    if (currentUser && environment && type) {
      await acknowledgeNotificationsByUserAndType({ uid: currentUser.uid, environment, type });
    } else {
      console.error(`notification acknowledgement failed: ${type}`);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  'currentUser,environment',
  actions
)(AcknowledgeNotifications);
