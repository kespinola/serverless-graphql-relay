import React from 'react';
import { compose } from 'ramda';
import { Grid, Row, Col } from 'react-flexgrid';
import authControl from './../../decorators/authControl';
import userInfo from './../../decorators/userInfo';
import UserForm from './../UserForm';

const SignIn = ({ auth: { actions: { signInRequest } } }) => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <UserForm submitLabel="Sign In" onSubmit={signInRequest} />
        </Col>
      </Row>
    </Grid>
  );
};

export default compose(
  authControl,
  userInfo,
)(SignIn);
