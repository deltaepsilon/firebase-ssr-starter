import React from 'react';
import moment from 'moment';

export default ({ datetime }) => {
  return <span>{datetime ? moment(datetime).fromNow() : '∞'}</span>;
};
