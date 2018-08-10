import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Form from '../form/form';
import Switch from '../form/switch';
import { Icon } from 'rmwc/Icon';

import Paper from '../../components/paper/paper';
import getToken from '../../utilities/messaging/get-token';
import setSettings from '../../database/settings/set-settings';
import SaveableTextField from '../form/saveable-text-field';
import ProfileImage from './profile-image';

export function SettingsForm({ currentUser, environment, settings, setMessagingToken }) {
  const uid = currentUser && currentUser.uid;
  const settingsSetter = setSettings(environment, uid);

  return uid && settings ? (
    <Paper>
      <h1>Settings</h1>

      <hr />

      <Form>

        <SaveableTextField
          value={settings.displayName}
          label="Full Name"
          onSave={async displayName => settingsSetter({ displayName })}
        />

        <h4>Profile Image</h4>

        <ProfileImage settings={settings} setSettings={settingsSetter} />

        <hr />

        <h3>Options</h3>

        <Switch
          checked={settings.messagingToken || false}
          onChange={async () => {
            if (settings.messagingToken) {
              await settingsSetter({ messagingToken: null });
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
              await settingsSetter({ optInEmail: false });
            } else {
              await settingsSetter({ optInEmail: true });
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
              await settingsSetter({ optInMarketing: false });
            } else {
              await settingsSetter({ optInMarketing: true });
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
