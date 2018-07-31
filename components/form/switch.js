import React from 'react';
import { Switch } from 'rmwc/Switch';

import '@material/switch/dist/mdc.switch.min.css';
import './form.css';

export default function SwitchRow(props) {
  return (
    <div className="switch form-row">
      <Switch {...props}>{props.children}</Switch>
    </div>
  );
}
