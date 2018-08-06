import React from 'react';
// import moment from 'moment';

export default ({ datetime }) => {
  return <span>{datetime ? new Date(datetime).toString() : '∞'}</span>;
};
