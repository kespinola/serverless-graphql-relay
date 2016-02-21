import React from 'react';
import { TextField, RaisedButton } from 'material-ui';

function UserForm({submitLabel}) {
  return (
    <form className="basic-form" autoComplete="off">
      <TextField
        fullWidth
        floatingLabelText="Email"
      />
      <TextField
        fullWidth
        floatingLabelText="Password"
        type="password"
      />
    <RaisedButton label={submitLabel} fullWidth primary />
    </form>
  );
}

export default UserForm;
