import React from 'react';
import { Grid, Row, Col } from 'react-flexgrid';
import UserForm from './../UserForm';

function SignUp() {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <UserForm submitLabel="Sign Up" />
        </Col>
      </Row>
    </Grid>
  );
}

export default SignUp;
