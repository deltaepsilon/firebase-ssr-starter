import React from 'react';
import TextField from './text-field';
import Button from 'rmwc/Button';

import '@material/button/dist/mdc.button.min.css';

export default class SaveableTextField extends React.Component {
  constructor() {
    super();

    this.state = {
      incomingValue: '',
      currentValue: '',
    };
  }

  get value() {
    return this.props.value || '';
  }

  get isDirty() {
    return this.value != this.state.currentValue;
  }

  componentDidMount() {
    this.compareIncomingValue(null, this.props.value);
  }

  componentDidUpdate(prevProps) {
    this.compareIncomingValue(prevProps.value, this.props.value);
  }

  compareIncomingValue(prev, current) {
    if (prev != current) {
      this.setState({ currentValue: current });
    }
  }

  handleChange({ target: { value } }) {
    this.setState({ currentValue: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSave(this.state.currentValue);
  }

  render() {
    const filteredProps = { ...this.props };

    delete filteredProps.onSave;
    delete filteredProps.value;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          {...filteredProps}
          value={this.state.currentValue}
          onChange={this.handleChange.bind(this)}
        >
          <Button raised disabled={!this.isDirty} onClick={console.log}>
            {this.props.children || 'Save'}
          </Button>
        </TextField>
      </form>
    );
  }
}
