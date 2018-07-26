import React from 'react';
import AppShell from '../../components/app-shell/app-shell';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import Paper from '../../components/paper/paper';

import '@material/button/dist/mdc.button.min.css';

export default function() {
  return (
    <AppShell secure>
      <Paper>
        <h1>Settings</h1>

        <hr/>

        <p>Enable notifications to receive alerts on your device.</p>

        <Button raised onClick={() => console.log('toggle enable notifications')}>
          <Icon use="settings" />
          <span>Enable Notifications</span>
        </Button>
      </Paper>
    </AppShell>
  );
}
