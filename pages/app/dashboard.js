import React from 'react';
import AppShell from '../../components/app-shell/app-shell';
import UserDashboard from '../../components/dashboard/user-dashboard';

export default function Dashboard() {
  return (
    <AppShell secure>
      <UserDashboard />
    </AppShell>
  );
}
