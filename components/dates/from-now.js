import React from 'react';
import fromNow from 'from-now';

export default ({ datetime }) => {
  let now = new Date();
  if (new Date(datetime) > now) {
    datetime = now;
  }
  
  return <span>{datetime ? fromNow(datetime) : '∞'}</span>;
};
