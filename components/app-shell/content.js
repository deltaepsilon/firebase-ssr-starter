import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import ImageDetail from '../images/image-detail';

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
    return (
      <div className="content">
        {this.props.children}
        <ImageDetail src={this.props.imageDetailSrc} />
      </div>
    );
  }
}

export default connect(
  'imageDetailSrc',
  actions
)(Content);
