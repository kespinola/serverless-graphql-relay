import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';

const validate = ({ name }) => {
  const errors = {};
  if (!name) errors.name = 'Name is Reqired.';
  return errors;
};

const RoleForm = ({ submitLabel, fields: { name }, handleSubmit }) => (
  <form className="basic-form" autoComplete="off" onSubmit={handleSubmit}>
    <TextField
      {...name}
      fullWidth
      type="name"
      floatingLabelText="Name"
      errorText={name.touched && name.error}
    />
  <RaisedButton type="submit" label={submitLabel} fullWidth primary />
  </form>
);

export default reduxForm({
  form: 'role',
  fields: ['name', 'userId'],
  validate,
},
(state, { userId }) => ({
  initialValue: { userId },
}),
)(RoleForm);
