import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

import './authentication.css';

export class Authentication extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  get auth() {
    return window && window.firebase ? window.firebase.auth() : { onAuthStateChanged: () => null };
  }

  componentDidMount() {
    this.auth.onAuthStateChanged(currentUser => {
      this.setState({ loaded: true });
      if (this.props.secure && !currentUser) {
        location.replace('/login');
      }
    });
  }

  render() {
    console.log('this.state.loaded', this.state.loaded);
    return !this.state.loaded ? (
      <div className="authentication">
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      </div>
    ) : null;
  }
}

export default connect(
  '',
  actions
)(Authentication);
