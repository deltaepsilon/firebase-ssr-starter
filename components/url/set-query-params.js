/* globals location */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import createLink from '../../utilities/create-link';

export class SetQueryParams extends React.Component {
  get root() {
    return location.href.split('?')[0];
  }

  componentDidMount() {
    const { params } = this.props;

    // console.log('mounted', params);

    if (this.noUndefinedParams(params) && typeof history == 'object') {
      const link = createLink(this.root, params);
      const url = this.withoutOrigin(link);
      const original = this.withoutOrigin(location.href);

      if (url != original && typeof this.props.router.push == 'function') {
        // console.log('pushState', url, original);
        this.props.router.push(url);
      }
    }
  }

  componentWillUnmount() {
    // console.log('unmounting', this.props.params);
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
