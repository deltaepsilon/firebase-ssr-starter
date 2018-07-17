import React from 'react';
import AppShell from '.././components/app-shell/app-shell';

export default function() {
  return (
    <AppShell secure>
      <h1>settings.js</h1>
      <div>This page requires an auth token</div>
    </AppShell>
  );
}
