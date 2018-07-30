import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { Switch } from 'rmwc/Switch';
import { Icon } from 'rmwc/Icon';
import Paper from '../../components/paper/paper';
import getToken from '../../utilities/messaging/get-token';
import setSettings from '../../database/settings/set-settings';

import '@material/switch/dist/mdc.switch.min.css';

export function SettingsForm({
  currentUser,
  environment,
  settings: { messagingToken },
  setMessagingToken,
}) {
  const uid = currentUser && currentUser.uid;

  return (
    <Paper>
      <h1>Settings</h1>

      <hr />

      <p>Enable notifications to receive alerts on your device.</p>

      <Switch
        checked={messagingToken || false}
        onChange={async () => {
          if (messagingToken) {
            await setSettings(environment, uid)({ messagingToken: null });
            Alert('Messaging disabled');
          } else {
            await getToken({ environment, uid })(setMessagingToken);
            Alert('Messaging enabled');
          }
        }}
      >
        <span>Receive app alerts</span>
        <Icon use="settings" />
      </Switch>
    </Paper>
  );
}

export default connect(
  'currentUser,environment,settings',
  actions
)(SettingsForm);
