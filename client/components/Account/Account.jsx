import React from 'react';
import { compose } from 'ramda';
import { Grid, Row, Col } from 'react-flexgrid';
import Profiles from './../../../both/collections/profiles';
import collectionControl from './../../decorators/collectionControl';
import userInfo from './../../decorators/userInfo';
import AccountForm from './../AccountForm';

const Account = ({ user, collection: { actions: { update } } }) => (
  <Grid fluid>
    <Row>
      <Col xs={12} sm={8} smOffset={2}>
        <AccountForm doc={user} submitLabel="Update Profile" onSubmit={update} />
      </Col>
    </Row>
  </Grid>
);

export default compose(
  collectionControl({ collection: Profiles, successRedirect: '/' }),
  userInfo,
)(Account);
