import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';

function AccountForm({ submitLabel, fields: { firstName, lastName }, handleSubmit }) {
  return (
    <form className="basic-form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        {...firstName}
        fullWidth
        floatingLabelText="First Name"
      />
      <TextField
        {...lastName}
        fullWidth
        floatingLabelText="Last Name"
      />
    <RaisedButton type="submit" label={submitLabel} fullWidth primary />
    </form>
  );
}

export default reduxForm({
  form: 'account',
  fields: ['_id', 'firstName', 'lastName'],
},
(state, { doc }) => ({
  initialValues: doc,
}),
)(AccountForm);
