import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { Snackbar } from 'rmwc/Snackbar';

import '@material/snackbar/dist/mdc.snackbar.min.css';

export class ErrorHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      message: '',
    };
  }
  componentDidMount() {
    window.HandledError = error => {
      const rawError = error
        .split(':')
        .pop()
        .trim();
      const message = `Error: ${rawError}`;

      this.setState({ show: true, message });
      return false;
    };
  }

  hide() {
    this.setState({ show: false, message: '' });
  }

  render() {
    const hide = this.hide.bind(this);
    return (
      <Snackbar
        actionHandler={hide}
        actionText="dismiss"
        dismissesOnAction
        message={this.state.message}
        multiline
        onHide={hide}
        show={this.state.show}
      />
    );
  }
}

export default connect(
  '',
  actions
)(ErrorHandler);
