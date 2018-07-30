import React from 'react';
import AppShell from '../../components/app-shell/app-shell';
import SettingsForm from "../../components/settings/settings-form";

export default function Settings() {
  return (
    <AppShell secure>
      <SettingsForm />
    </AppShell>
  );
}