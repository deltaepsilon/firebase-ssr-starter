/* globals firebase */
import React from 'react';

export default class BaseSubscription extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  get canSubscribe() {
    return true;
  }

  shouldUpdate() {
    return !this.subscription;
  }

  componentDidMount() {
    this.attemptSubscription();
  }

  componentDidUpdate(prevState) {
    this.attemptSubscription();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  attemptSubscription() {
    if (this.canSubscribe && this.shouldUpdate()) {
      this.unsubscribe();
      this.subscription = this.subscribe();

      if (!this.subscription) {
        this.subscription = true;
        throw new Error(
          'Subscription failed to return an unsubscribe function! Abort!!!! Infinite loop ahead.'
        );
      }
    } else if (!this.canSubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {}

  unsubscribe() {
    this.setState({ items: [] });

    if (this.subscription && typeof this.subscription === 'function') {
      this.subscription && this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  addItem(item) {
    const items = [...this.state.items];

    if (item.__isNewRecord) {
      items.unshift(item);
    } else {
      items.push(item);
    }

    this.setState({ items });
  }

  render() {
    return null;
  }
}
