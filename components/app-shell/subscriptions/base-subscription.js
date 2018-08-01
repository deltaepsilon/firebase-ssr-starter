/* globals firebase */
import React from 'react';

export default class BaseSubscription extends React.Component {
  get canSubscribe() {
    return true;
  }

  componentDidMount() {
    this.attemptSubscription();
  }

  componentDidUpdate() {
    this.attemptSubscription();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  attemptSubscription() {
    if (!this.subscription && this.canSubscribe) {
      this.subscription = this.subscribe();
    } else if (!this.canSubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {}

  unsubscribe() {
    if (this.subscription) {
      this.subscription && this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  render() {
    return null;
  }
}
