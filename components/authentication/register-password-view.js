/* globals firebase */
import React from 'react';

import Paper from '../paper/paper';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

import '@material/button/dist/mdc.button.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import './authentication.css';

export default function RegisterPasswordView({ password, isValid, setPassword, setView, views }) {
  return (
    <Paper z={1} className="card authentication">
      <h2 className="centered">Log in or register</h2>
      <hr />
      <form onSubmit={handleSubmit(setPassword)}>
        <TextField
          label="Password"
          value={password}
          outlined
          required
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          outlined
          required
          onChange={e => setPassword(e.target.value)}
        />
      </form>
      <footer>
        <Button raised accent onClick={setView(views.selector)} disabled={!isValid}>
          Register
        </Button>
        <Button onClick={setView(views.selector)}>
          <Icon use="arrow_back" />
        </Button>
      </footer>
    </Paper>
  );
}

function handleSubmit(setPassword) {
  return e => {
    e.preventDefault();

    console.log('setPassword', setPassword);
  };
}
