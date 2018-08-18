import React from 'react';

export default ({ datetime }) => {
  return <span>{datetime ? new Date(datetime).toLocaleString().replace(/:\d\d /, ' ') : ''}</span>;
};
