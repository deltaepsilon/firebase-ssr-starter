import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import Form from '../form/form';
import Switch from '../form/switch';
import { Icon } from 'rmwc/Icon';

import Paper from '../../components/paper/paper';
import SetSettings from '../../database/settings/set-settings';

import SaveableTextField from '../form/saveable-text-field';
import ProfileImage from './profile-image';

export function SettingsForm({
  currentUser,
  environment,
  isSubscribedToFCM,
  settings,
  user,
  setIsSubscribedToFCM,
}) {
  const uid = currentUser && currentUser.uid;
  const setSettings = SetSettings(environment, uid);

  return uid && settings ? (
    <Paper>
      <h1>Settings</h1>

      <hr />

      <Form style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '100%', width: '40rem' }}>
          <SaveableTextField
            value={settings.displayName}
            label="Full Name"
            onSave={async displayName => setSettings({ displayName })}
          />

          <br />

          <h4>Email</h4>

          <p>{user.email}</p>

          <br />

          <h4>Profile Image</h4>

          <ProfileImage settings={settings} setSettings={setSettings} />

          <hr />

          <h3>Options</h3>

          <Switch
            checked={isSubscribedToFCM || false}
            onChange={async () => {
              if (isSubscribedToFCM) {
                await setIsSubscribedToFCM(false);
                Alert('Messaging disabled');
              } else {
                await setIsSubscribedToFCM(true);
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
                await setSettings({ optInEmail: false });
              } else {
                await setSettings({ optInEmail: true });
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
                await setSettings({ optInMarketing: false });
              } else {
                await setSettings({ optInMarketing: true });
              }
            }}
          >
            <Icon use="local_offer" />
            <span>Marketing email</span>
          </Switch>
        </div>
      </Form>
    </Paper>
  ) : null;
}

export default connect(
  'currentUser,environment,isSubscribedToFCM,settings,user',
  actions
)(SettingsForm);
