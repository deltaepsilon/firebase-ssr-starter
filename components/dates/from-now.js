import React from 'react';
import fromNow from 'from-now';

export default ({ datetime }) => {
  return <span>{datetime ? fromNow(datetime) : '∞'}</span>;
};
