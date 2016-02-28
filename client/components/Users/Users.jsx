import React from 'react';
import { compose } from 'ramda';
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody,
  Avatar,
} from 'material-ui';
import { Grid, Row, Col } from 'react-flexgrid';
import Profiles from './../../../both/collections/profiles';
import meteorData from './../../decorators/meteorData';

const users = ({ profiles }) => {
  return (
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
};

export default compose(
  meteorData(() => ({ profiles: Profiles.find({}).fetch() })),
)(users);
