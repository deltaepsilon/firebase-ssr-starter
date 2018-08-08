/* globals location */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

export class ProcessQueryParams extends React.Component {
  componentDidMount() {
    this.props.processQueryParams(location.search);
  }
  render() {
    return null;
  }
}

export default connect(
  '',
  actions
)(ProcessQueryParams);
