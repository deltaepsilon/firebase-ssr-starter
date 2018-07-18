import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';

export class Authentication extends React.Component {
  get auth() {
    return window && window.firebase ? window.firebase.auth() : { onAuthStateChanged: () => null };
  }

  componentDidMount() {
    this.auth.onAuthStateChanged(async currentUser => {
      if (this.props.secure && !currentUser) {
        this.props.router.push('/login');
      }

      this.props.setCurrentUser(currentUser);
      await this.setCustomClaims(currentUser);

      this.props.setLoaded(true);
    });
  }

  async setCustomClaims(currentUser) {
    if (currentUser) {
      const { claims } = await currentUser.getIdTokenResult();
      this.props.setClaims(claims);

      if (this.props.admin && !claims.isAdmin) {
        this.props.router.push('/');
      }
    }
  }

  render() {
    return null;
  }
}

export default connect(
  'isSSR,currentUser,router',
  actions
)(Authentication);
