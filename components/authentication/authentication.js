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
    this.auth.onAuthStateChanged(async currentUser => {
      this.props.setCurrentUser(currentUser);
      this.setCustomClaims(currentUser);
      this.setState({ loaded: true });
      
      if (this.props.secure && !currentUser) {
        location.replace('/login');
      }
    });
  }

  async setCustomClaims(currentUser) {
    if (currentUser) {
      const {claims} = await currentUser.getIdTokenResult();
      console.log('claims', claims);
      this.props.setClaims(claims);
    }
  }

  render() {
    return null;
  }
}

export default connect(
  'isSSR,currentUser',
  actions
)(Authentication);
 