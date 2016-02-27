import React from 'react';
import { Grid, Row, Col } from 'react-flexgrid';
import UserForm from './../UserForm';

function SignIn() {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <UserForm submitLabel="Sign In" />
        </Col>
      </Row>
    </Grid>
  );
}

export default SignIn;
