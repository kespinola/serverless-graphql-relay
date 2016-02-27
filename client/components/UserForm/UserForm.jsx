import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { reduxForm } from 'redux-form';

const validate = ({email, password}) => {
  const errors = {};
  if (!email) errors.email = 'Email is Required';
  if (!password) errors.password = 'Password is Required';
  return errors;
};

function UserForm({ submitLabel, fields: { email, password }, handleSubmit }) {
  return (
    <form className="basic-form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        {...email}
        fullWidth
        type="email"
        floatingLabelText="Email"
        errorText={email.touched && email.error}
      />
      <TextField
        {...password}
        fullWidth
        floatingLabelText="Password"
        type="password"
        errorText={password.touched && password.error}
      />
    <RaisedButton type="submit" label={submitLabel} fullWidth primary />
    </form>
  );
}

export default reduxForm({
  form: 'user',
  fields: ['email', 'password'],
  validate,
})(UserForm);
