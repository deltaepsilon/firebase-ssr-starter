import React from 'react';
import Form from '../form/form';
import SaveableTextField from '../form/saveable-text-field';
import { IconButton } from 'rmwc/IconButton';

import '@material/icon-button/dist/mdc.icon-button.min.css';
import './messages.css';

export default class MessageForm extends React.Component {
  constructor() {
    super();

    this.state = {
      mode: 'text',
    };
  }

  toggleMode() {
    const mode = this.state.mode == 'text' ? 'file' : 'text';

    this.setState({ mode });
  }

  render() {
    const { onMessage } = this.props;
    const { mode } = this.state;
    const isText = mode == 'text';

    return (
      <div className="message-form">
        <IconButton
          use={isText ? 'cloud_upload' : 'textsms'}
          onClick={this.toggleMode.bind(this)}
        />

        <Form>
          <SaveableTextField clearOnSave="true" onSave={onMessage}>
            Send
          </SaveableTextField>
        </Form>
      </div>
    );
  }
}
