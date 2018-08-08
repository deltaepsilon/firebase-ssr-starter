import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { TabBar, Tab, TabBarScroller } from 'rmwc/Tabs';

import '@material/tabs/dist/mdc.tabs.min.css';

export function AdminTabs({ adminTabIndex, setAdminTabIndex }) {
  return (
    <TabBarScroller>
      <TabBar
        activeTabIndex={adminTabIndex}
        onChange={evt => setAdminTabIndex(evt.detail.activeTabIndex)}
      >
        <Tab>Dashboard</Tab>
        <Tab>Users</Tab>
        <Tab>Transactions</Tab>
        <Tab>Subscriptions</Tab>
      </TabBar>
    </TabBarScroller>
  );
}

export default connect(
  'adminTabIndex',
  actions
)(AdminTabs);
