import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

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
      this.props.setCurrentUser(currentUser);
      this.setState({ loaded: true });
      if (this.props.secure && !currentUser) {
        location.replace('/login');
      }
    });
  }

  render() {
    return null;
  }
}

export default connect(
  'isSSR,currentUser',
  actions
)(Authentication);
