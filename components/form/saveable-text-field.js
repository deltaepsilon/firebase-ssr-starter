import React from 'react';
import TextField from './text-field';
import Button from 'rmwc/Button';

import '@material/button/dist/mdc.button.min.css';

export default class SaveableTextField extends React.Component {
  constructor() {
    super();

    this.state = {
      proposedValue: '',
    };
  }

  get value() {
    return this.props.value || '';
  }

  get isDirty() {
    return this.value != this.state.proposedValue;
  }

  handleChange({ target: { value } }) {
    this.setState({ proposedValue: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSave(this.state.proposedValue);
  }

  render() {
    const propsExceptOnSave = { ...this.props };

    delete propsExceptOnSave.onSave;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField {...propsExceptOnSave} onChange={this.handleChange.bind(this)}>
          <Button raised disabled={!this.isDirty} onClick={console.log}>
            {this.props.children || 'Save'}
          </Button>
        </TextField>
      </form>
    );
  }
}
