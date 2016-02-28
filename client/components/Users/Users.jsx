import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'ramda';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody,
} from 'material-ui';
import { Grid, Row, Col } from 'react-flexgrid';
import Profiles from './../../../both/collections/profiles';
import meteorData from './../../decorators/meteorData';

const getProfiles = () => {
  Meteor.subscribe('profiles');
  return { profiles: Profiles.find({}).fetch() };
};

const users = ({ profiles }) => (
  <Grid fluid>
    <Row>
      <Col xs={12} sm={10} smOffset={1}>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Full Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map(({ _id, fullName }) => {
            return (
              <TableRow key={_id}>
                <TableRowColumn>{fullName}</TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
        </Table>
      </Col>
    </Row>
  </Grid>
);

export default compose(
  meteorData(getProfiles),
)(users);
