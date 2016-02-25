import React from 'react';
import { compose } from 'ramda';
import { Grid, Row, Col } from 'react-flexgrid';
import authControl from './../../decorators/authControl';
import userInfo from './../../decorators/userInfo';
import UserForm from './../UserForm';

const SignUp = ({ auth: { actions: { signUpRequest } } }) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <UserForm submitLabel="Sign Up" onSubmit={signUpRequest} />
        </Col>
      </Row>
    </Grid>
  );
};

export default compose(
  authControl,
  userInfo,
)(SignUp);
