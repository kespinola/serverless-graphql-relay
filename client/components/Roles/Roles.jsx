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
  FlatButton,
} from 'material-ui';
import { Grid, Row, Col } from 'react-flexgrid';
import RoleForm from './../RoleForm';
import userInfo from './../../decorators/userInfo';
import dialogControl from './../../decorators/dialogControl';
import roleControl from './../../decorators/roleControl';
import meteorData from './../../decorators/meteorData';
import { Toolbar, ToolbarGroup, RaisedButton, Dialog } from 'material-ui';

const getRoles = () => {
  Meteor.subscribe('roles');

  return { roles: Meteor.roles.find({ }) };
};


const Roles = ({
  dialog: { open, actions: { showDialog, hideDialog } },
  role: { actions: { createRole, deleteRole } },
  user: { userId },
  roles,
}) => {
  const onSubmit = ({ name }) => {
    hideDialog();
    createRole(name);
  };
  return (
    <div>
      <Dialog
        open={open}
        onRequestClose={hideDialog}
      >
        <RoleForm
          userId={userId}
          submitLabel="Create Role"
          onSubmit={onSubmit}
        />
      </Dialog>
      <Toolbar>
        <ToolbarGroup float="right">
          <RaisedButton primary label="Create Role" onClick={showDialog} />
        </ToolbarGroup>
      </Toolbar>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={10} smOffset={1}>
            <Table selectable={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(({ _id, name }) => {
                const deleteCurrentRole = deleteRole.bind(null, name);
                return (
                    <TableRow key={_id}>
                      <TableRowColumn>{name}</TableRowColumn>
                      <TableRowColumn>
                        <FlatButton primary label="Delete" onClick={deleteCurrentRole} />
                      </TableRowColumn>
                    </TableRow>
                  );
              })}
            </TableBody>
            </Table>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default compose(
  dialogControl('roles'),
  userInfo,
  roleControl,
  meteorData(getRoles),
)(Roles);
