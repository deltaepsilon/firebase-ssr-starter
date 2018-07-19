import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import Backdrop from '../loaders/backdrop';
import CubeGridLoader from '../loaders/cube-grid-loader';

export class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      transitioning: false,
    };
  }

  get transitionMilliseconds() {
    return 1000 * 0;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.transitioning && !prevProps.loaded && this.props.loaded) {
      this.setState({ transitioning: true });
      setTimeout(() => this.setState({ transitioning: false }), this.transitionMilliseconds);
    }
  }

  render() {
    const { children, loaded } = this.props;
    const { transitioning } = this.state;

    return (
      <div className="content">
        {children}
      </div>
    );
  }
}

export default connect(
  'loaded',
  actions
)(Content);
