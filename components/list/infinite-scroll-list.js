/* globals document, window */
import React from 'react';
import { List } from 'rmwc/List';

import ThreeBounceLoader from '../loaders/three-bounce-loader';

import '@material/list/dist/mdc.list.min.css';

export default class InfiniteScrollList extends React.Component {
  constructor() {
    super();

    this.loader = React.createRef();
    this.wrapper = React.createRef();
    this.debounceTimer = 0;
    this.__evaluateLoader = this.evaluateLoader.bind(this);
  }

  get wrapperHeight() {
    return this.wrapper.current.clientHeight || 0;
  }

  get loaderTop() {
    return this.loader.current && this.loader.current.getBoundingClientRect().top;
  }

  get loaderBottom() {
    return this.loader.current && this.loader.current.getBoundingClientRect().bottom;
  }

  get wrapperTop() {
    return this.wrapper.current && this.wrapper.current.getBoundingClientRect().top;
  }

  get isLoaderVisible() {
    return this.props.inverseScroll
      ? this.loaderBottom > this.wrapperTop
      : this.loaderTop < this.wrapperHeight;
  }

  get debounceMillis() {
    return this.props.debounce || 1 * 1000;
  }

  componentDidMount() {
    this.wrapper.current.addEventListener('scroll', this.__evaluateLoader);
    window.document.addEventListener('scroll', this.__evaluateLoader);
  }

  componentDidUpdate() {
    this.evaluateLoader();

    if (this.props.autoScroll) {
      const el = this.wrapper.current;
      const listNodes = [...el.querySelectorAll('.mdc-list > *')];
      const scrollTargetIndex = this.props.scrollTargetIndex || 0;
      const adjustedScrollTargetIndex = this.props.inverseScroll
        ? listNodes.length - 1 - scrollTargetIndex
        : scrollTargetIndex;
      const scrollTargetNode = listNodes[adjustedScrollTargetIndex];

      if (scrollTargetNode) {
        const headroom = 111;
        const offset =
          el.scrollTop -
          el.getBoundingClientRect().top +
          scrollTargetNode.getBoundingClientRect().top -
          headroom;

        scrollTargetNode && scrollTargetNode.focus();

        el.scrollTop = offset;
      }
    }
  }

  componentWillUnmount() {
    this.wrapper.current.removeEventListener('scroll', this.__evaluateLoader);
    window.document.removeEventListener('scroll', this.__evaluateLoader);
  }

  evaluateLoader() {
    this.debounceTimer && clearTimeout(this.debounceTimer);

    this.debounceTimer =
      this.isLoaderVisible &&
      setTimeout(() => {
        !this.props.isFinished && this.props.next();
      }, this.debounceMillis);
  }

  render() {
    const { children, name, inverseScroll, isFinished } = this.props;

    const Loader = () =>
      !isFinished && (
        <div ref={this.loader}>
          <ThreeBounceLoader />
        </div>
      );

    return (
      <div name={name} ref={this.wrapper}>
        {inverseScroll && <Loader />}
        <List>{inverseScroll ? children.reverse() : children}</List>
        {!inverseScroll && <Loader />}
      </div>
    );
  }
}
