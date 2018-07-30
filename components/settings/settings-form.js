import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import Paper from '../../components/paper/paper';
import getToken from '../../utilities/messaging/get-token';
import setSettings from '../../database/settings/set-settings';

import '@material/button/dist/mdc.button.min.css';

export function SettingsForm({ currentUser, environment, settings, setMessagingToken }) {
  const uid = currentUser && currentUser.uid;

  return (
    <Paper>
      <h1>Settings</h1>

      <hr />

      <p>Enable notifications to receive alerts on your device.</p>

      {settings.messagingToken ? (
        <Button
          raised
          onClick={async () => {
            await setSettings(environment, uid)({ messagingToken: null });
            Alert('Messaging disabled');
          }}
        >
          <Icon use="settings" />
          <span>Disable Notifications</span>
        </Button>
      ) : (
        <Button
          raised
          onClick={async () => {
            await getToken({ environment, uid })(setMessagingToken);
            Alert('Messaging enabled');
          }}
        >
          <Icon use="settings" />
          <span>Enable Notifications</span>
        </Button>
      )}
    </Paper>
  );
}

export default connect(
  'currentUser,environment,settings',
  actions
)(SettingsForm);
