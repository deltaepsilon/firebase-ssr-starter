/* globals firebase */

import React from 'react';
import Paper from '../paper/paper';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';

import '@material/button/dist/mdc.button.min.css';
import './authentication.css';

import { FacebookSvg, GoogleSvg } from '../svg';

export default ({ setView, views }) => {
  return (
    <Paper z={1} className="card authentication">
      <h2 className="centered">Select sign-in method</h2>
      <hr />
      <ul className="plain">
        <li>
          <Button raised onClick={setView(views.email)}>
            <Icon use="email" />
            <span>Email</span>
          </Button>
        </li>
        <li>
          <Button raised className="google" onClick={login('google')}>
            <GoogleSvg />
            <span>Google</span>
          </Button>
        </li>
        <li>
          <Button raised className="facebook" onClick={login('facebook')}>
            <FacebookSvg />
            <span>Facebook</span>
          </Button>
        </li>
      </ul>
    </Paper>
  );
};

function login(providerName) {
  return () => {
    const providers = {
      google: firebase && new firebase.auth.GoogleAuthProvider(),
      facebook: firebase && new firebase.auth.FacebookAuthProvider(),
    };

    firebase
      .auth()
      .signInWithPopup(providers[providerName])
      .catch(({ message }) => {
        throw new HandledError(message);
      });
  };
}
