import React from 'react';
import authControl from './../../decorators/authControl';
import { Grid, Row, Col } from 'react-flexgrid';
import UserForm from './../UserForm';

function SignUp({ auth: { actions: { signUpRequest } } }) {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <UserForm submitLabel="Sign Up" onSubmit={signUpRequest} />
        </Col>
      </Row>
    </Grid>
  );
}

export default authControl(SignUp);
