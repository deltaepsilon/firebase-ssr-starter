/* globals firebase */
import React from 'react';

import Paper from '../paper/paper';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

import '@material/button/dist/mdc.button.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import './authentication.css';

export default function EmailView({ email, isValid, setEmail, setView, views }) {
  return (
    <Paper z={1} className="card authentication">
      <h2 className="centered">Sign in or register</h2>
      <hr />
      <form onSubmit={e => e.preventDefault()}>
        <TextField
          autoFocus
          label="Email"
          type="email"
          value={email}
          outlined
          required
          onChange={e => setEmail(e.target.value)}
        />
        <footer>
          <Button raised onClick={setView(views.loginPassword)} disabled={!isValid}>
            Login
          </Button>
          <Button raised accent onClick={setView(views.registerPassword)} disabled={!isValid}>
            Register
          </Button>
          <span className="flex" />
          <Button onClick={setView(views.selector)}>
            <Icon use="arrow_back" />
          </Button>
        </footer>
      </form>
    </Paper>
  );
}
