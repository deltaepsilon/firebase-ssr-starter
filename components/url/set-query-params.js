/* globals location */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import createLink from '../../utilities/create-link';

export class SetQueryParams extends React.Component {
  get root() {
    return location.href.split('?')[0];
  }

  componentDidUpdate(prevProps) {
    const prevParams = JSON.stringify(prevProps.params);
    const params = JSON.stringify(this.props.params);

    if (prevParams != params) {
      this.setParams();
    }
  }

  setParams() {
    const { params } = this.props;

    if (this.noUndefinedParams(params) && typeof history == 'object') {
      const link = createLink(this.root, params);
      const url = this.withoutOrigin(link);
      const original = this.withoutOrigin(location.href);

      if (url != original && typeof this.props.router.push == 'function') {
        this.props.router.push(url);
      }
    }
  }

  noUndefinedParams(params) {
    let isUndefined;

    for (let key in params) {
      if (typeof params[key] == 'undefined') {
        isUndefined = true;
      }
    }

    return !isUndefined;
  }

  withoutOrigin(link) {
    return link.replace(location.origin, '');
  }

  render() {
    return null;
  }
}

export default connect(
  'router',
  actions
)(SetQueryParams);
