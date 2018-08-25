import React from 'react';
import Form from '../form/form';
import SaveableTextField from '../form/saveable-text-field';
import ImageUpload from '../form/image-upload';

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

  async handleComplete(upload) {
    await this.props.onUpload(upload);
    this.setState({ mode: 'text' });
  }

  render() {
    const { onBlur, onFocus, onMessage } = this.props;
    const { mode } = this.state;
    const isText = mode == 'text';

    return (
      <div className="message-form">
        <IconButton
          use={isText ? 'cloud_upload' : 'textsms'}
          onClick={this.toggleMode.bind(this)}
        />

        <Form>
          {isText ? (
            <SaveableTextField
              clearOnSave="true"
              onSave={onMessage}
              icon="send"
              onBlur={onBlur}
              onFocus={onFocus}
            />
          ) : (
            <ImageUpload
              autoOpen
              useIconButton
              height="75px"
              width="75px"
              options={{ height: 720, width: 720 }}
              onComplete={this.handleComplete.bind(this)}
            />
          )}
        </Form>
      </div>
    );
  }
}
