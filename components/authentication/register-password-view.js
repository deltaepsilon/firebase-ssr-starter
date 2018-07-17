/* globals firebase */
import React from 'react';

import Paper from '../paper/paper';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';

import '@material/button/dist/mdc.button.min.css';
import '@material/textfield/dist/mdc.textfield.min.css';
import './authentication.css';

export default function RegisterPasswordView({
  email,
  password,
  passwordValidation,
  isValid,
  register,
  setPassword,
  setPasswordValidation,
  setView,
  views,
}) {
  return (
    <Paper z={1} className="card authentication">
      <h2 className="centered">Register</h2>
      <hr />
      <form onSubmit={handleSubmit({ register, email, password, isValid })}>
        <TextField label="Email" type="email" value={email} outlined disabled />
        <TextField
          autoFocus
          label="Password"
          type="password"
          value={password}
          outlined
          required
          onChange={e => setPassword(e.target.value)}
        />
        <TextFieldHelperText persistent validationMsg>
          Password length must be greater than 5 characters.
        </TextFieldHelperText>
        <TextField
          label="Validate password"
          type="password"
          value={passwordValidation}
          outlined
          required
          onChange={e => setPasswordValidation(e.target.value)}
        />
        <footer>
          <Button raised accent type="submit" disabled={!isValid}>
            Register
          </Button>
          <span className="flex" />
          <Button onClick={setView(views.email)}>
            <Icon use="arrow_back" />
          </Button>
        </footer>
      </form>
    </Paper>
  );
}

function handleSubmit({ register, email, password, isValid }) {
  return e => {
    e.preventDefault();

    if (isValid) {
      register(email, password);
    }
  };
}
