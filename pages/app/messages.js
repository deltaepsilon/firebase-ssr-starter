import React from 'react';
import AppShell from '../../components/app-shell/app-shell';
import UserMessages from '../../components/messages/user-messages';

export default function Settings() {
  return (
    <AppShell secure>
      <UserMessages />
    </AppShell>
  );
}
