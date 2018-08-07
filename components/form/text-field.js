import React from 'react';
import { TextField } from 'rmwc/TextField';

import '@material/textfield/dist/mdc.textfield.min.css';
import './form.css';

export default function TextFieldRow(props) {
  const propsExceptChildren = { ...props, children: null };

  return (
    <div className={`text-field form-row ${props.centered ? 'centered' : ''}`}>
      <TextField {...propsExceptChildren} />
      {props.children}
    </div>
  );
}
