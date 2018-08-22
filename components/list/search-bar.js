/* globals algoliasearch */
import React from 'react';
import Form from '../form/form';
import TextField from '../form/text-field';
import { TextFieldIcon } from 'rmwc/TextField';
import { IconButton } from 'rmwc/IconButton';

import algoliasearch from 'algoliasearch/lite';

import setId from '../../utilities/set-id';

import '@material/icon-button/dist/mdc.icon-button.min.css';

export default class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      results: {},
    };
  }

  get index() {
    const { algolia, index } = this.props;
    return this.client.initIndex(`${algolia.prefix}:${index}`);
  }

  componentDidMount() {
    this.initializeAlgoliaClient();
  }

  initializeAlgoliaClient() {
    const { applicationId, searchOnlyApiKey } = this.props.algolia;

    this.client = algoliasearch(applicationId, searchOnlyApiKey);
  }

  reset() {
    this.setState({ value: '', results: {} });
    this.props.onSearchResults([]);
  }

  handleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  }

  handleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  }

  handleChange({ target: { value } }) {
    this.setState({ value });
    this.index.search({ query: value }, (err, results) => {
      if (err) {
        throw new HandledError(err);
      } else {
        const hits = this.mapHits(results.hits);

        this.setState({ results });
        this.props.onSearchResults(hits || []);
      }
    });
  }

  mapHits(hits) {
    return hits.map(hit => setId(hit.objectID, hit));
  }

  handleKeyUp({ key }) {
    if (key == 'Escape') {
      this.reset();
    }
  }

  render() {
    return (
      <Form>
        <TextField
          autoFocus
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onChange={this.handleChange.bind(this)}
          withLeadingIcon={<TextFieldIcon use="search" />}
          value={this.state.value}
        >
          <IconButton use="clear" onClick={this.reset.bind(this)} />
        </TextField>
      </Form>
    );
  }
}
