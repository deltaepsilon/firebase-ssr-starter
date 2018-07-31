import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Form from '../form/form';
import Switch from '../form/switch';
import { Icon } from 'rmwc/Icon';
import Paper from '../../components/paper/paper';
import getToken from '../../utilities/messaging/get-token';
import setSettings from '../../database/settings/set-settings';

export function SettingsForm({ currentUser, environment, settings, setMessagingToken }) {
  const uid = currentUser && currentUser.uid;

  return uid && settings ? (
    <Paper>
      <h1>Settings</h1>

      <hr />

      <Form>
        <Switch
          checked={settings.messagingToken || false}
          onChange={async () => {
            if (settings.messagingToken) {
              await setSettings(environment, uid)({ messagingToken: null });
              Alert('Messaging disabled');
            } else {
              await getToken({ environment, uid })(setMessagingToken);
              Alert('Messaging enabled');
            }
          }}
        >
          <Icon use="message" />
          <span>In-app alerts</span>
        </Switch>
        <Switch
          checked={settings.optInEmail || false}
          onChange={async () => {
            if (settings.optInEmail) {
              await setSettings(environment, uid)({ optInEmail: false });
            } else {
              await setSettings(environment, uid)({ optInEmail: true });
            }
          }}
        >
          <Icon use="email" />
          <span>Email alerts</span>
        </Switch>
        <Switch
          checked={settings.optInMarketing || false}
          onChange={async () => {
            if (settings.optInMarketing) {
              await setSettings(environment, uid)({ optInMarketing: false });
            } else {
              await setSettings(environment, uid)({ optInMarketing: true });
            }
          }}
        >
          <Icon use="local_offer" />
          <span>Marketing email</span>
        </Switch>
      </Form>
    </Paper>
  ) : null;
}

export default connect(
  'currentUser,environment,settings',
  actions
)(SettingsForm);
