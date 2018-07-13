import React from 'react';
import AppShell from '.././components/app-shell/app-shell';

export default function({ url }) {
  return (
    <AppShell url={url} secure>
      <h1>secure.js</h1>
      <div>This page requires an auth token</div>
    </AppShell>
  );
}
