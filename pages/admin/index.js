import React from 'react';

import AppShell from '../../components/app-shell/app-shell';
import AdminTabs from '../../components/admin/admin-tabs';
import AdminTabContent from '../../components/admin/admin-tab-content';

export default function() {
  return (
    <AppShell secure admin>
      <AdminTabs />
      <AdminTabContent />
    </AppShell>
  );
}
