import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import ActiveTab from '../../components/tabs/active-tab';
import AdminDashboard from './admin-dashboard';
import AdminSubscriptions from './admin-subscriptions';
import AdminTransactions from './admin-transactions';
import AdminUsers from './admin-users';

const tabs = [<AdminDashboard />, <AdminTransactions />, <AdminSubscriptions />, <AdminUsers />];

export function AdminTabContent({ adminTabIndex }) {
  return tabs.map((tab, index) => (
    <ActiveTab key={index} tabIndex={index} activeIndex={adminTabIndex}>
      {tab}
    </ActiveTab>
  ));
}

export default connect(
  'adminTabIndex',
  actions
)(AdminTabContent);
