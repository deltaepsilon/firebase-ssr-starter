import React from 'react';
import AppShell from '../../components/app-shell/app-shell';
import ModeratorMessages from '../../components/messages/moderator-messages';

export default function Settings() {
  return (
    <AppShell secure>
      <ModeratorMessages />
    </AppShell>
  );
}
