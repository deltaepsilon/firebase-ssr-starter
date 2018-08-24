/* globals window */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import { Snackbar } from 'rmwc/Snackbar';

import '@material/snackbar/dist/mdc.snackbar.min.css';

export class AlertHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      message: '',
      url: '',
    };
  }
  componentDidMount() {
    window.Alert = (message, url = '') => {
      this.setState({ show: true, message, url });
      return false;
    };
  }

  handleClick() {
    const { url } = this.state;

    this.hide();

    if (url) {
      window.location = url;
    }
  }

  hide() {
    this.setState({ show: false, message: '', url: '' });
  }

  render() {
    const { message, show, url } = this.state;

    return (
      <Snackbar
        alignStart
        actionHandler={this.handleClick.bind(this)}
        actionText="dismiss"
        dismissesOnAction
        message={message}
        actionText={url ? 'Visit' : ''}
        multiline
        onHide={this.hide.bind(this)}
        show={show}
        // timeout={1000 * 60}
      />
    );
  }
}

export default connect(
  '',
  actions
)(AlertHandler);
