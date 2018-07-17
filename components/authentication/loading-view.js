/* globals firebase */
import React from 'react';

import Paper from '../paper/paper';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';

import CubeGridLoader from '../loaders/cube-grid-loader';
import '../loaders/cube-grid-loader.css';

import '@material/button/dist/mdc.button.min.css';
import './authentication.css';

export default function LoadingView({ loadingMessage, setView, views }) {
  return (
    <Paper z={1} className="card authentication">
      <h2 className="centered">{loadingMessage}</h2>
      <hr />
      <div>
        <CubeGridLoader />
      </div>
      <footer>
        <span className="flex" />
        <Button onClick={setView(views.selector)}>
          <Icon use="arrow_back" />
        </Button>
      </footer>
    </Paper>
  );
}
