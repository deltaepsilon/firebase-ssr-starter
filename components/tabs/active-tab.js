import React from 'react';

export default ({ activeIndex, tabIndex, children }) => {
  return tabIndex == activeIndex ? <>{children}</> : null;
};
