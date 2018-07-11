import React from 'react';
import AppShell from '.././components/app-shell/app-shell';
import devEnvironment from '../environments/environment.dev';
import prodEnvironment from '../environments/environment';

export default class App extends React.Component {
  static async getInitialProps() {
    return {
      nodeEnv: process.env.NODE_ENV,
    };
  }

  get environment() {
    return this.props.nodeEnv == 'production' ? prodEnvironment : devEnvironment;
  }

  render() {
    return (
      <AppShell environment={this.environment}>
        <h1>index.js</h1>
        <div>Todo: add react router</div>
      </AppShell>
    );
  }
}
