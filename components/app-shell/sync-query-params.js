/* globals location */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import parseSearch from '../../utilities/parse-search';

const queryParamsMap = { adminTabIndex: 'setAdminTabIndex', detailUserId: 'setDetailUserId' };
const queryParams = Object.keys(queryParamsMap);

export class SyncQueryParams extends React.Component {
  get queryParams() {
    return queryParams;
  }

  get params() {
    return parseSearch(location.search);
  }

  componentDidUpdate() {
    if (this.props.router.beforePopState) {
      this.props.router.beforePopState(this.syncQueryParams.bind(this));
    }
  }

  syncQueryParams() {
    const params = this.queryParams.reduce((params, key) => {
      params[key] = this.params[key] || undefined;
      return params;
    }, {});

    for (let param in params) {
      this.props[queryParamsMap[param]](params[param]);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  'router',
  actions
)(SyncQueryParams);
