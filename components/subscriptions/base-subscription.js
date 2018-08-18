/* globals firebase */
import React from 'react';

export default class BaseSubscription extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.attemptSubscription();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.identifier != this.props.identifier) {
      this.unsubscribe();
      this.attemptSubscription();
    }
  }

  attemptSubscription() {
    const { getFinished, getNext, observable } = this.props;

    // console.log('subscribing', this.props.name);

    this.subscription = observable.subscribe(
      getNext({ addItem: this.addItem.bind(this) }),
      error => {
        throw new HandledError(error);
      },
      getFinished ? getFinished() : () => ({})
    );

    if (!this.subscription) {
      this.subscription = true;
      throw new Error(
        'Subscription failed to return an unsubscribe function! Abort!!!! Infinite loop ahead.'
      );
    }
  }

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

    return this.state.items;
  }

  render() {
    return null;
  }
}
