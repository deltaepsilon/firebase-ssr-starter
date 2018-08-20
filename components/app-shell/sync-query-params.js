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

  componentDidUpdate(prevProps) {
    if (prevProps.pathname != this.props.pathname) {
      this.setParams(this.props.query);
    }
    
    if (this.props.router.beforePopState) {
      this.props.router.beforePopState(this.syncQueryParams.bind(this));
    }
  }

  syncQueryParams() {
    const query = this.queryParams.reduce((params, key) => {
      params[key] = this.params[key] || undefined;
      return params;
    }, {});

    this.setParams(query);
  }

  setParams(query) {
    for (let param in query) {
      this.props[queryParamsMap[param]](query[param]);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  'pathname,query,router',
  actions
)(SyncQueryParams);
